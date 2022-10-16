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




---

# Exploitation
## Name of the technique
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

---

# Lateral Movement to user
## Local Enumeration
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

## Lateral Movement vector
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

---

# Privilege Escalation
## Local Enumeration
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

## Privilege Escalation vector
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

---

