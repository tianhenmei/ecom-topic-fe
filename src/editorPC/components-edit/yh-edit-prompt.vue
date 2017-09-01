<template>
    <div class="yh-edit-prompt hide" :id="id" ref="yh-edit-prompt">
        <div class="title">{{title}}</div>
        <div class="yh-edit-prompt-content clearfix">
            <span class="yh-edit-prompt-text">{{text}}</span>
            <input type="number" placeholder="1" class="yh-edit-prompt-value" ref="yh-edit-prompt-value" />
        </div>
        <div class="choose clearfix">
            <div class="add" @click.stop.prevent="addEvent">添加</div>
            <div class="undo" @click.stop.prevent="undoEvent">取消</div>
        </div>
    </div>
</template>
<script>
    export default {
        props:['id','title','text'],
        data(){
            return {

            }
        },
        methods:{
            addEvent(e){
                let parent = this.$refs['yh-edit-prompt'],
                    input = this.$refs['yh-edit-prompt-value'],
                    value = input.value
                if(/[0-9]/g.test(value)){
                    value = parseInt(value)
                }else{
                    value = 1
                }
                this.$emit('setListCol',value)
                parent.className += ' hide'
            },
            undoEvent(e){
                let parent = this.$refs['yh-edit-prompt']
                parent.className += ' hide'
            }
        }
    }
</script>

<style>
.yh-edit-prompt {
    width: 400px;
    height: 210px;
    border: 1px solid #00c99b;
    box-shadow: 0 0 50px #00c99b;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -105px 0 0 -200px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
}
.yh-edit-prompt .title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #02e8b4;
    color: #fff;
    text-align: center;
    font-size:16px;
}
.yh-edit-prompt-content{
    padding: 30px 40px;
}
.yh-edit-prompt-text{
    height: 40px;
    line-height: 40px;
    float: left;
    color: #666;
}
.yh-edit-prompt-value {
    width: 270px;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    font-size: 14px;
    float:left;
}
.yh-edit-prompt .choose{
    width:320px;
    padding:0 0 0 10px;
    margin: 5px auto 0;
}
.yh-edit-prompt .choose > div{
    width:150px;
    height:40px;
    line-height:40px;
    margin:0 10px 0 0;
    background-color:#02e8b4;
    color:#fff;
    text-align:center;
    font-size:16px;
    border-radius:8px;
    float:left;
}
.yh-edit-prompt .choose > div.undo {
    background-color: #666;
}
</style>