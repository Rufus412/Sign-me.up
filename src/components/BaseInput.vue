<template>
    <label for="name">{{ label }}:</label>
    <input id="name" :placeholder="label" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline field" v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" >
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