#### -Per typing "sudo –l" I found the following:

[+] We can sudo without supplying a password!
Matching Defaults entries for cmeeks on hetemit:
    !visiblepw, always_set_home, match_group_by_gid, always_query_group_plugin, env_reset, env_keep="COLORS DISPLAY HOSTNAME HISTSIZE KDEDIR LS_COLORS", env_keep+="MAIL PS1 PS2 QTDIR USERNAME LANG LC_ADDRESS LC_CTYPE", env_keep+="LC_COLLATE LC_IDENTIFICATION LC_MEASUREMENT LC_MESSAGES", env_keep+="LC_MONETARY LC_NAME LC_NUMERIC LC_PAPER LC_TELEPHONE", env_keep+="LC_TIME LC_ALL LANGUAGE LINGUAS _XKB_CHARSET XAUTHORITY", secure_path=/sbin\:/bin\:/usr/sbin\:/usr/bin
 
User cmeeks may run the following commands on hetemit:
    (root) NOPASSWD: /sbin/halt, /sbin/reboot, /sbin/poweroff
	
#### -Per linpeas.sh I found I can write to "/etc/systemd/system/pythonapp.service":

![](../Pasted%20Images/Pasted%20image%2020220601141341.png)

#### -Typed vi "/etc/systemd/system/pythonapp.service" and found the following:

[Unit]
Description=Python App
After=network-online.target
 
[Service]
Type=simple
WorkingDirectory=/home/cmeeks/restjson_hetemit
ExecStart=flask run -h 0.0.0.0 -p 50000
TimeoutSec=30
RestartSec=15s
User=cmeeks
ExecReload=/bin/kill -USR1 $MAINPID
Restart=on-failure
 
[Install]
WantedBy=multi-user.target

#### -Modified the ExecStart and User lines, and removed the WorkingDirectory= line:

![](../Pasted%20Images/Pasted%20image%2020220601141518.png)

#### -As "services" require to be restarted/system reboot to refresh whatever changes I made to the service app I typed "sudo /sbin/reboot" and system was rebooted

#### -I then got another reverse listener set up with port 1800 and received a root shell:

![](../Pasted%20Images/Pasted%20image%2020220601141627.png)