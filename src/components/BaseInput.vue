<template>
    <label for="name">{{ label }}:</label>
    <input id="name" :placeholder="label" class="field" v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" >
</template>


<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [String, Number],
            default: ''
        }
    }
}
</script>