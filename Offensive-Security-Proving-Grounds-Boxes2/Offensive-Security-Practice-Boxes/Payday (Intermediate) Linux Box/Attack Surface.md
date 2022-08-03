| Port | Service     | Notes                                       |
| ---- | ----------- | ------------------------------------------- |
| 22   | SSH         | OpenSSH 4.6p1 Debian 5build1 (protocol 2.0) |
| 80   | HTTP        | Apache httpd 2.2.4                          |
| 110  | pop3        | Dovecot pop3d                               |
| 139  | netbios-ssn | Samba smbd 3.X - 4.X (workgroup: MSHOME)    |
| 143  | Imap        | Dovecot imapd                               |
| 995  | ssl/pop3    | Dovecot pop3d                               |             |                                             |


Starting Nmap 7.92 ( https://nmap.org ) at 2022-03-02 17:28 EST 

Nmap scan report for 192.168.170.39 

Host is up (0.18s latency). 

  

PORT    STATE SERVICE     VERSION 

22/tcp  open  ssh         OpenSSH 4.6p1 Debian 5build1 (protocol 2.0) 

80/tcp  open  http        Apache httpd 2.2.4 ((Ubuntu) PHP/5.2.3-1ubuntu6) 

|_http-title: CS-Cart. Powerful PHP shopping cart software 

110/tcp open  pop3        Dovecot pop3d 

|_tls-nextprotoneg: ERROR: Script execution failed (use -d to debug) 

|_ssl-date: ERROR: Script execution failed (use -d to debug) 

|_tls-alpn: ERROR: Script execution failed (use -d to debug) 

| ssl-cert: Subject: commonName=ubuntu01/organizationName=OCOSA/stateOrProvinceName=There is no such thing outside US/countryName=XX 

| Not valid before: 2008-04-25T02:02:48 

|_Not valid after:  2008-05-25T02:02:48 

|_pop3-capabilities: RESP-CODES CAPA STLS PIPELINING SASL UIDL TOP 

| sslv2:  

|   SSLv2 supported 

|   ciphers:  

|     SSL2_RC4_128_EXPORT40_WITH_MD5 

|     SSL2_RC2_128_CBC_WITH_MD5 

|     SSL2_RC2_128_CBC_EXPORT40_WITH_MD5 

|     SSL2_RC4_128_WITH_MD5 

|_    SSL2_DES_192_EDE3_CBC_WITH_MD5 

139/tcp open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: MSHOME) 

143/tcp open  imap        Dovecot imapd 

|_tls-alpn: ERROR: Script execution failed (use -d to debug) 

|_tls-nextprotoneg: ERROR: Script execution failed (use -d to debug) 

|_ssl-date: ERROR: Script execution failed (use -d to debug) 

| ssl-cert: Subject: commonName=ubuntu01/organizationName=OCOSA/stateOrProvinceName=There is no such thing outside US/countryName=XX 

| Not valid before: 2008-04-25T02:02:48 

|_Not valid after:  2008-05-25T02:02:48 

|_imap-ntlm-info: ERROR: Script execution failed (use -d to debug) 

|_sslv2: ERROR: Script execution failed (use -d to debug) 

445/tcp open  netbios-ssn Samba smbd 3.0.26a (workgroup: MSHOME) 

993/tcp open  ssl/imap    Dovecot imapd 

|_ssl-date: 2022-03-02T22:29:25+00:00; +7s from scanner time. 

| ssl-cert: Subject: commonName=ubuntu01/organizationName=OCOSA/stateOrProvinceName=There is no such thing outside US/countryName=XX 

| Not valid before: 2008-04-25T02:02:48 

|_Not valid after:  2008-05-25T02:02:48 

|_imap-capabilities: CAPABILITY 

| sslv2:  

|   SSLv2 supported 

|   ciphers:  

|     SSL2_RC4_128_EXPORT40_WITH_MD5 

|     SSL2_RC2_128_CBC_WITH_MD5 

|     SSL2_RC2_128_CBC_EXPORT40_WITH_MD5 

|     SSL2_RC4_128_WITH_MD5 

|_    SSL2_DES_192_EDE3_CBC_WITH_MD5 

995/tcp open  ssl/pop3    Dovecot pop3d 

|_ssl-date: 2022-03-02T22:29:24+00:00; +7s from scanner time. 

| ssl-cert: Subject: commonName=ubuntu01/organizationName=OCOSA/stateOrProvinceName=There is no such thing outside US/countryName=XX 

| Not valid before: 2008-04-25T02:02:48 

|_Not valid after:  2008-05-25T02:02:48 

| sslv2:  

|   SSLv2 supported 

|   ciphers:  

|     SSL2_RC4_128_EXPORT40_WITH_MD5 

|     SSL2_RC2_128_CBC_WITH_MD5 

|     SSL2_RC2_128_CBC_EXPORT40_WITH_MD5 

|     SSL2_RC4_128_WITH_MD5 

|_    SSL2_DES_192_EDE3_CBC_WITH_MD5 

Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel 

  

Host script results: 

|_clock-skew: mean: 1h15m08s, deviation: 2h30m03s, median: 6s 

| smb-security-mode:  

|   account_used: guest 

|   authentication_level: user 

|   challenge_response: supported 

|_  message_signing: disabled (dangerous, but default) 

|_smb2-time: Protocol negotiation failed (SMB2) 

| smb-os-discovery:  

|   OS: Unix (Samba 3.0.26a) 

|   Computer name: payday 

|   NetBIOS computer name:  

|   Domain name:  

|   FQDN: payday 

|_  System time: 2022-03-02T17:29:08-05:00 

  

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ . 

Nmap done: 1 IP address (1 host up) scanned in 43.06 seconds 