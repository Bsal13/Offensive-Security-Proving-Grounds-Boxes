Nmap 7.92 scan initiated Tue Mar 15 04:10:01 2022 as: nmap --open -Pn -sV -sC -p 21,22,25,5432,8080 -oN 192.168.189.56/recon/nmap_detailed_TCP_Quick -oX 192.168.189.56/recon/xml_nmap/nmap_detailed_TCP_Quick_xml 192.168.189.56
Nmap scan report for 192.168.189.56
Host is up (0.16s latency).
 
PORT     STATE SERVICE    VERSION
21/tcp   open  ftp        vsftpd 3.0.3
22/tcp   open  ssh        OpenSSH 7.4p1 Debian 10+deb9u7 (protocol 2.0)
| ssh-hostkey: 
|   2048 ba:3f:68:15:28:86:36:49:7b:4a:84:22:68:15:cc:d1 (RSA)
|   256 2d:ec:3f:78:31:c3:d0:34:5e:3f:e7:6b:77:b5:61:09 (ECDSA)
|_  256 4f:61:5c:cc:b0:1f:be:b4:eb:8f:1c:89:71:04:f0:aa (ED25519)
25/tcp   open  smtp       Postfix smtpd
|_smtp-commands: banzai.offseclabs.com, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN, SMTPUTF8
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=banzai
| Subject Alternative Name: DNS:banzai
| Not valid before: 2020-06-04T14:30:35
|_Not valid after:  2030-06-02T14:30:35
7
| ssl-cert: Subject: commonName=banzai
| Subject Alternative Name: DNS:banzai
| Not valid before: 2020-06-04T14:30:35
|_Not valid after:  2030-06-02T14:30:35
|_ssl-date: TLS randomness does not represent time
8080/tcp open  http       Apache httpd 2.4.25
|_http-title: 403 Forbidden
|_http-server-header: Apache/2.4.25 (Debian)
Service Info: Hosts:  banzai.offseclabs.com, 127.0.1.1; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
 
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Tue Mar 15 04:10:17 2022 -- 1 IP address (1 host up) scanned in 17.16 seconds



Nmap 7.92 scan initiated Tue Mar 15 04:09:53 2022 as: nmap --open -sS -Pn -p- -oN 192.168.189.56/recon/nmap_full -oX 192.168.189.56/recon/xml_nmap/nmap_full_xml 192.168.189.56
Nmap scan report for 192.168.189.56
Host is up (0.085s latency).
Not shown: 65528 filtered tcp ports (no-response), 1 closed tcp port (reset)
Some closed ports may be reported as filtered due to --defeat-rst-ratelimit
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
25/tcp   open  smtp
5432/tcp open  postgresql
8080/tcp open  http-proxy
8295/tcp open  unknown
 
# Nmap done at Tue Mar 15 04:13:29 2022 -- 1 IP address (1 host up) scanned in 216.22 seconds