import React from 'react'

function Form (props) {
    const { values, change, submit, disabled, errors } = props;

    const onChange = evt => {
        const { name, value, type, checked } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    }

    const onSubmit = evt => {
        evt.preventDefault();
        submit();
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group inputs'>
                <div className='errors'>
                    {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
                    {errors.name.length > 0 ? <div>{errors.name}</div> : null}
                    <div>{errors.role}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.terms}</div>
                </div>

                <label>Name&nbsp;
                    <input 
                    type="text"
                    value={values.name.charAt(0).toUpperCase() + values.name.slice(1)}
                    onChange={onChange}
                    name="name"
                    placeholder="insert name here.."
                    maxLength="20" // form input attributes
                    />
                </label>
  
                <label>Role
                    <select value={values.role} name="role" onChange={onChange}>
                        <option value=''>-- Select a Role --</option>
                        <option value='Front-End Developer'>Front-End Developer</option>
                        <option value='Back-End Developer'>Back-End Developer</option>
                        <option value='Full-stack engineer'>Full-stack engineer</option>
                    </select>
                </label>

                <label>Email
                    <input
                    type="email"
                    value={values.email} //setup in app.js and passed down
                    onChange={onChange}
                    name="email"
                    placeholder="insert email here.."
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
                    />
                </label>

                <label>Password
                    <input
                    type="password"
                    value={values.password} //setup in app.js and passed down
                    onChange={onChange}
                    name="password"
                    placeholder="Password (8 characters min)"
                    minlength="8" required
                    />
                </label>

                <label>Terms of Service
                    <input 
                    type='checkbox'
                    name='terms'
                    checked={values.terms} //this will evaluate to true or false itself
                    onChange={onChange}
                    />
                </label>

                <div className='submit'>
                    <button disabled={disabled}>submit</button> 
                </div>
                
            </div>
        </form>
    )
}

export default Form;