<template>
    <div kitty-tips>
        <div v-if="tips.show" :transition="tips.transition_name" class="kitty-tips">
            {{tips.message}}
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            tips:{
                type:Object,
                required:true,
                twoWay:false   // 双向绑定（对象默认双向绑定）
            }
        }
    }
</script>
