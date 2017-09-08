<template>
    <div class="yh-form" yh-states>
        <input type="text"
            :style="props.style" />
    </div>
</template>
<script>
    export default {
        props:['props'],
        data(){
            return {
                changeStatus:false,
                basewith:[
                    'font-size',
                    'width',
                    'height',
                    'line-height',
                    'color',
                    'background-color',
                    'image',
                    'border',
                    'box-shadow'
                ]
            }
        },
        methods:{
            setEvent(name,value,designValue){
                let elem = $('.setting'),
                    content = elem.find('.kitty-form-content'),
                    form = elem.find('.yh-form')
                
                this.props.href = designValue
            },
            setChangeStatus(status){
                this.changeStatus = true
            }
        }
    }
</script>
<style>
    
</style>