<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <i class="icon icon-add-resource"></i>
  </div>
</template>

<script>
const path = require('path')
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted () {
    console.log(__dirname)
    console.log(path.join(__dirname, 'src'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  background-color: #ccc;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
