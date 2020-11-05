<template>
  <div class="nf-login">
    <a-form :form="form" @submit="handleSubmit">
      <h1>Login Here</h1>
      <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
        <a-input
          v-decorator="[
            'username',
            { rules: [{ required: true, message: 'Please input your username!' }] }
          ]"
          placeholder="Username"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
        <a-input
          v-decorator="[
            'password',
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          class="btn"
          html-type="submit"
          :disabled="hasErrors(form.getFieldsError())"
        >Login</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this),
    }
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('username') && getFieldError('username')
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$post('/api/user/login', values).then((res) => {
            // if (res.code === 200) {
            this.$message.success(res.msg)
            this.$router.push('/admin')
            // }
          })
        }
      })
    },
  },
}
</script>
