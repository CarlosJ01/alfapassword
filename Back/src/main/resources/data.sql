insert  into `roles`(`id`,`role`) values 
('c8332a0c-5414-4d7e-a197-995c8f5cff27','ADMIN');

insert  into `usuarios`(`id`,`active`,`password`,`username`) values 
('8ad0b5b5-5bab-4d05-a60e-55eadfca8e2c', b'1', '$2a$10$P4nwC9oIhF1X3vGV5zxEU.Gix5N4Yn6FGizfmpTo1Hkfg1boxNpAC','AlfaCentauri.01');

insert  into `user_role`(`user_id`,`role_id`) values 
('8ad0b5b5-5bab-4d05-a60e-55eadfca8e2c','c8332a0c-5414-4d7e-a197-995c8f5cff27');