#### -Typed "sudo –l" I found the user can run sudo on (ALL : ALL) /bin/nice /notes/* : 

![](../Pasted%20Images/Pasted%20image%2020220510191757.png)

#### -Created a file in user "webadmin" user home directory with "/bin/bash" and created the name of "root.sh". Then made file "root.sh" file executiblle with "chmod +x root.sh". Ran "sudo /bin/nice /notes/../home/webadmin/root.sh" and received a root shell: 

![](../Pasted%20Images/Pasted%20image%2020220510191902.png)