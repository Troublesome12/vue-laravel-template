<template>
    <div class="login row justify-content-center">
        <div class="col-md-4">
            <div class="card">
                <div class="card-header text-center"><b>Register</b></div>
                <div class="card-body">
                    <form @submit.prevent="register">
                        <div class="form-group">
                            <label for="name">Name:</label>
                            <input type="text" v-model="form.name" class="form-control" placeholder="Name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" v-model="form.email" class="form-control" placeholder="Email Address">
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" v-model="form.password" class="form-control" placeholder="Password">
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btn btn-info" value="Register">
                        </div>
                       <div class="errors" v-if="errors">
                            <ul>
                                <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
                                    <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
                                </li>
                            </ul>
                        </div>
                        <div class="errors" v-if="serverErr">
                            {{ serverErr }}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {register} from '../../helper/auth'
    import validate from 'validate.js';
    export default {
        name: 'login',
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: ''
                },
                errors: null,
                serverErr: null
            }
        },
        methods: {
            register: function(){
                this.errors = null;
                const constraints = this.getConstraints();
                const errors = validate(this.$data.form, constraints);
                if(errors) {
                    this.errors = errors;
                    return;
                }
                axios.post('/api/register', this.$data.form)
                    .then((response) => {
                        this.$router.push('/login');
                    }).
                    catch((err) => {
                        this.serverErr = "Email has already taken";
                    });
            },
            getConstraints() {
                return {
                    name: {
                        presence: true,
                        length: {
                            minimum: 3,
                            message: 'Must be at least 3 characters long'
                        }
                    },
                    email: {
                        presence: true,
                        email: true
                    },
                    password: {
                        presence: true,
                        length: {
                            minimum: 4,
                            message: 'Must be at least 4 characters long'
                        }
                    }
                };
            }
        },
        computed: {
            authError() {
                return this.$store.getters.authError;
            }
        }

    }
</script>

<style scoped>
    .error {
        text-align: center;
        color: red;
    }
</style>