##安装步骤##

1.  全局安装node(v6.11.0 及以上)、npm(v3.10.10 及以上)
2.  进入根目录(即package.json所在目录), 运行 npm install, 它会安装开发及编译环境, 比如gulp、webpack、vue等组件


##开发命令##

1.  npm run create -- --sys:projectName 创建项目projectName,如果想要创建某个项目中的组件，使用如下命令： 
    npm run create -- --sys:projectName --components:ComponentName/style1  (style1：样式名，可为 1->n )
2.  npm run dev -- --sys:projectName 开发项目时启动项目projectName(监听8090)
3.  npm run dist -- --sys:projectName 编译项目projectName，最终生成文件线上使用


##部署命令##

1.  npm run start 启动项目
2.  npm run stop 停止项目
3.  npm run monit 监听项目
4.  npm run restart 重新启动项目