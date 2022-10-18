---
Alias: Hunit
Date: 6/1/2022
Platform: Linux
Difficulty: Intermediate
Tags:
Status: Finished
IP: 
---

# {{Hunit}}


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

```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 80 - HTTP (Apache)

#### -Navigated to http://192.168.143.125:8080 and found the following web page and clicked on a link of a user's hauiku on the web page and right clicked and clicked "view page source" and found it had directory "/api"

![](Pasted%20image%2020221016220003.png)
![](Pasted%20image%2020221017173943.png)

#### -Navigated to "/api" directory and found the following and clicked "raw data" and found  directory "/user":

![](Pasted%20image%2020221017174047.png)

![](Pasted%20image%2020221017174142.png)

#### -Navigated to directory "/user" and found user login "dademola" listed as an admin:

![](Pasted%20image%2020221017174304.png)

---

# Exploitation
## Located user credentials in directory shown in websites source code

#### -As port 43022 was found earlier running on SSH I typed the following to login to ssh session with the found credentials above "ssh –p 43022 dademola@192.168.143.125" with password "ExplainSlowQuest110" and received shell:

![](Pasted%20image%2020221017174428.png)

---

# Privilege Escalation
## Local Enumeration
#### -Ran "lse.sh" and found cron job "crontab.bak" running as root and was readable and found the below contents of "crontab.bak" which file "pull.sh" and "backups.sh" was running every 2 and 3 minutes:

![](Pasted%20image%2020221017175014.png)
![](Pasted%20image%2020221017175126.png)

#### -Searched more and found directory "git-server" and found it being owned by "git" user and was git backend files which are difficult to work with so I navigated to "/tmp" directory and typed "git clone file:///git-server/" to clone the server into the "/tmp" directory:

![](Pasted%20image%2020221017175529.png)

![](Pasted%20image%2020221017175722.png)

#### -Now we can review the contents of "backups.sh" file which shows as a place holder file:

![](Pasted%20image%2020221017180046.png)

#### -Set up git identity by typing git config --global user.name "dademola" AND git config --global user.email "dademola@hunit.(none)"

![](Pasted%20image%2020221017180308.png)

#### -Typed "echo "touch /tmp/gitscript-test" >> backups.sh" and "chmod +x backups.sh" to inject a test instruction into the "backups.sh" file and to make it executable:

![](Pasted%20image%2020221017180606.png)

#### -But after receiving an error when trying to push the file onto the git-server and further investigation the server is owned by user "git":

#### -Found a user named "git" and found we have read and execute permissions on their ssh "id_rsa" file which is a private SSH Key:

![](Pasted%20image%2020221017180818.png)

![](Pasted%20image%2020221017180904.png)

#### -Navigate to my kali machine and typed "scp -P 43022 dademola@192.168.93.125:/home/git/.ssh/id_rsa ." to upload the private ssh key to my kali machine and "chmod 600" to set the correct permissions:



## Privilege Escalation vector
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

---

# Trophy & Loot
user.txt

root.txt