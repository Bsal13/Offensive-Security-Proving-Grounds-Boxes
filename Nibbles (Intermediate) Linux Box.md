---
Alias: Nibbles
Date: 5/30/22
Platform: Linux
Difficulty: Intermediate
Tags: #PostgreSQLRCEexploit #FindSUIDprivilegeEscalation 
Status: Finished
IP: 192.168.236.47
---

# {{Nibbles}}


# Resolution summary
- Logged into PostgreSQL with default credentials
- Ran a found PostgreSQL exploit and received a shell
- Located SUID /usr/bin/find on the target machine
- Found "find" bin in the GTFOBINS website and went throught the steps to escalate privileges and received a root shell

## Improved skills
- psql tool enumeration
- PostgreSQL default credentials finding

## Used tools
- nmap
- psql

---

# Information Gathering
Scanned all TCP ports:
```bash
# Nmap 7.92 scan initiated Wed Mar  9 18:41:34 2022 as: nmap -vv --reason -Pn -A --osscan-guess --version-all -p- -oN /home/kali/Downloads/ProvingGroundsBoxes/Nibbles/results/192.168.236.47/scans/_full_tcp_nmap.txt -oX /home/kali/Downloads/ProvingGroundsBoxes/Nibbles/results/192.168.236.47/scans/xml/_full_tcp_nmap.xml 192.168.236.47
adjust_timeouts2: packet supposedly had rtt of -181277 microseconds.  Ignoring time.
adjust_timeouts2: packet supposedly had rtt of -181277 microseconds.  Ignoring time.
Nmap scan report for 192.168.236.47
Host is up, received user-set (0.084s latency).
Scanned at 2022-03-09 18:41:36 EST for 380s
Not shown: 65529 filtered tcp ports (no-response)
PORT     STATE  SERVICE      REASON         VERSION
21/tcp   open   ftp          syn-ack ttl 63 vsftpd 3.0.3
22/tcp   open   ssh          syn-ack ttl 63 OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 10:62:1f:f5:22:de:29:d4:24:96:a7:66:c3:64:b7:10 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDJgyzpWrB8SyLb/XmPYQYzsnfizW7d0aNZHpwQ9ivcHQ/RYLbCc8yUIQGN2JMqCgfSj8CRMA36UnV8jnngjkw9njcgMyA5qc1mO4tzzH7VNkW2t5AmP7Q1HBt+SThlLa0JxBN6Gd5BOPwrsk9YTjLj8ax2ncvGBq8jzQjYmm9jF4VgBak5DY+Q5JWdf9krumSlR+V8yneV9aQ6sVy2XgkCJQLQ8GoUTm/13XUTc3TCKQ2KOJ2FzA8VcNTfxqTDxalwnYrZ1tod7BRfMeff5MwxC5gzeB+hdOVC0zAZlvNtMxH6SCxMBRCoX9IHL27E6WtSGXCj1SLYJWrFImjp+I1L
|   256 c9:15:ff:cd:f3:97:ec:39:13:16:48:38:c5:58:d7:5f (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBM7uIYLogPsKP+c0QrezqQfB94ml7djfUOtG8ZAoMX6yK898l0TbgyAShcQSmdOsSMGdSO4GZpixCFJdsYkBi0M=
|   256 90:7c:a3:44:73:b4:b4:4c:e3:9c:71:d1:87:ba:ca:7b (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKoHnGdMtb37ORTRBt2cTfWvQE7IB3fF3ewP/1tqn0JF
80/tcp   open   http         syn-ack ttl 63 Apache httpd 2.4.38 ((Debian))
|_http-title: Enter a title, displayed at the top of the window.
| http-methods: 
|_  Supported Methods: OPTIONS HEAD GET POST
|_http-server-header: Apache/2.4.38 (Debian)
139/tcp  closed netbios-ssn  reset ttl 63
445/tcp  closed microsoft-ds reset ttl 63
5437/tcp open   postgresql   syn-ack ttl 63 PostgreSQL DB 11.3 - 11.7
| ssl-cert: Subject: commonName=debian
| Subject Alternative Name: DNS:debian
| Issuer: commonName=debian
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2020-04-27T15:41:47
| Not valid after:  2030-04-25T15:41:47
| MD5:   b086 6d30 4913 684e 16c1 8348 fc76 fe43
| SHA-1: cb30 5109 0fc1 14ab 0fb9 8e55 5874 4bb5 ba57 66af
| -----BEGIN CERTIFICATE-----
| MIIC0DCCAbigAwIBAgIUYoM4kALX3eWKWuCQ1/K5FujVbGowDQYJKoZIhvcNAQEL
| BQAwETEPMA0GA1UEAwwGZGViaWFuMB4XDTIwMDQyNzE1NDE0N1oXDTMwMDQyNTE1
| NDE0N1owETEPMA0GA1UEAwwGZGViaWFuMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
| MIIBCgKCAQEAkpSVo7cfTt1CRy7yDV5Nr2dOJxIyg3JdaE+Mdtsw7/cbPaucXy/L
| fYOoyUsSINbZtIV6/WEpFVD+fIWwPoPWsgazcnNF0Z1quuxOjXnmZICvVqku5vHk
| Q+facbUNjGpz9OMC4s0y/T7uHH6psPoBBgL5ZVTNvU6tK/CnvjtPpMgQ+bOkIqsM
| mMxQnUILBBfUdaVfgetlPCc1qg4+fq0ZCP/d0vjIlb6kA3AuprjFo2xpLwtbx0RM
| BXkmm+STQRTxYnY62MRiL52tzACWfI7lml8LnUFP98tpPzT/0UCBx8cLLNrGlhQP
| ZZb7sALAS8hjpOcIjvRT+ZfXKHHma5RvGQIDAQABoyAwHjAJBgNVHRMEAjAAMBEG
| A1UdEQQKMAiCBmRlYmlhbjANBgkqhkiG9w0BAQsFAAOCAQEAJ1f62YGJW8Ds0e31
| s6hlCQX0kpn5+UXbTMMkjkBWp54aPg6YjUbg4py/E+gJtDWDv/Z8bT+ggiHdIQLf
| +99KE7ShNlnn+hiI4MYjza5rl2W00taN0PiYcKpz898aQ/4Kmho5wkYz+s1bi87O
| 5/IphYJXZYLOLf3CzuWzCT5RUBKZO/BVX79kqJvOLH2xJOkRwA9mgNh5QY0CBzCk
| NVOoDL+Yhof2sZs/UetiW//U8Mtiz22rQWmU4l/tU/X8rUAJQYOCmohGCXnU3aN2
| 6VSDkryCvRWChxwJtqXdKEMZ03E/zr35LhqLWmQmRSEjeVw10HN3g6Y1NpAKV1+g
| rFaQxA==
|_-----END CERTIFICATE-----
|_ssl-date: TLS randomness does not represent time
Device type: general purpose|firewall|storage-misc|WAP
Running (JUST GUESSING): Linux 2.6.X|3.X|4.X|2.4.X (87%), WatchGuard Fireware 11.X (87%), Synology DiskStation Manager 5.X (86%), FreeBSD 6.X (85%)
OS CPE: cpe:/o:linux:linux_kernel:2.6.32 cpe:/o:linux:linux_kernel:3.10 cpe:/o:linux:linux_kernel:4.4 cpe:/o:watchguard:fireware:11.8 cpe:/o:linux:linux_kernel cpe:/a:synology:diskstation_manager:5.1 cpe:/o:linux:linux_kernel:2.4 cpe:/o:freebsd:freebsd:6.2
OS fingerprint not ideal because: Didn't receive UDP response. Please try again with -sSU
Aggressive OS guesses: Linux 2.6.32 (87%), Linux 2.6.32 or 3.10 (87%), Linux 2.6.39 (87%), Linux 3.10 - 3.12 (87%), Linux 3.5 (87%), Linux 4.4 (87%), WatchGuard Fireware 11.8 (87%), Synology DiskStation Manager 5.1 (86%), Linux 2.6.35 (86%), Linux 4.9 (86%)
No exact OS matches for host (test conditions non-ideal).
TCP/IP fingerprint:
SCAN(V=7.92%E=4%D=3/9%OT=21%CT=139%CU=%PV=Y%DS=2%DC=T%G=N%TM=62293CAC%P=x86_64-pc-linux-gnu)
SEQ(SP=FF%GCD=1%ISR=10A%TI=Z%TS=A)
OPS(O1=M54EST11NW7%O2=M54EST11NW7%O3=M54ENNT11NW7%O4=M54EST11NW7%O5=M54EST11NW7%O6=M54EST11)
WIN(W1=FE88%W2=FE88%W3=FE88%W4=FE88%W5=FE88%W6=FE88)
ECN(R=Y%DF=Y%TG=40%W=FAF0%O=M54ENNSNW7%CC=Y%Q=)
T1(R=Y%DF=Y%TG=40%S=O%A=S+%F=AS%RD=0%Q=)
T2(R=N)
T3(R=N)
T4(R=N)
T5(R=Y%DF=Y%TG=40%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)
T6(R=N)
T7(R=N)
U1(R=N)
IE(R=Y%DFI=N%TG=40%CD=S)
 
Uptime guess: 6.069 days (since Thu Mar  3 17:07:57 2022)
Network Distance: 2 hops
TCP Sequence Prediction: Difficulty=255 (Good luck!)
IP ID Sequence Generation: All zeros
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
 
TRACEROUTE (using port 139/tcp)
HOP RTT      ADDRESS
1   85.77 ms 192.168.49.1
2   85.94 ms 192.168.236.47
 
Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Wed Mar  9 18:47:56 2022 -- 1 IP address (1 host up) scanned in 382.71 seconds

```

Enumerated open TCP ports:
```bash
5437
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 5437 PostgreSQL DB 11.3 - 11.7

#### -Found the following webpage when googled "list of postgesql usernames and passwords":

![](Images/Pasted%20image%2020221018104257.png)

#### -Typed "psql -h 192.168.143.47 -p 5437 -U postgres" and logged into the postgres server with user "postgres" and password "postgres" and found it was running version "11.7" which was also found in the nmap scan:

![](Images/Pasted%20image%2020221018104720.png)

---

# Exploitation
## PostgreSQL Remote Code Execution

#### -Googled postgresql reverse shell 11.7 github" and found the following webpage/script:
![](Images/Pasted%20image%2020221018105717.png)
![](Images/Pasted%20image%2020221018105824.png)
#PostgreSQLRCEexploit 

#### -Git cloned the code/script onto my kali machine and opened up the script in vim and modified script to have the remote ip/port and local ip/port

#### -Ran the script and setup a "penelope" listener running on port 80 as I know port 80 is open on the remote machine and received a reverse shell:

![](Images/Pasted%20image%2020221018111232.png)

![](Images/Pasted%20image%2020221018111311.png)

---

# Privilege Escalation
## Local Enumeration

#### -Ran the following command to search for SUID files as I was unable to download privilege escalation scripts to the target machine:

"find / -user root -perm -4000 -exec ls -ldb {} \; 2>/dev/null"

#### -Found the following when running the above command searching for SUID binaries:

![](Images/Pasted%20image%2020221018112111.png)

## Privilege Escalation vector
## Find SUID Privilege Escalation

#### -Found "find" bin in the GTFOBINS website and found the following command to run when "find" is running as SUID:
![](Images/Pasted%20image%2020221018112250.png)
#FindSUIDprivilegeEscalation 

![](Images/Pasted%20image%2020221018112651.png)
---

