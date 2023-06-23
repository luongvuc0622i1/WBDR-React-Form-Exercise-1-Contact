import './Contact.css';
import { useState } from 'react';

export default function Contact() {
    const [form, setForm] = useState(0);

    const REGEX = {
        name: /^[a-zA-Z]{2,}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }

    const MESSAGE_ERROR = {
        name: "Name error",
        email: "Email error",
        require: "Required"
    }

    function handleChange(event) {
        let error = "";
        if (!event.target.value) {
            error = MESSAGE_ERROR.require;
        } else if (event.target.name === "name" || event.target.name === "email") {
            error = REGEX[event.target.name].test(event.target.value) ? "" : MESSAGE_ERROR[event.target.name];
        }
        setForm({
            ...form,
            [event.target.name] : { value: event.target.value, error: error}
        });
    }

    function handleSubmit() {
        const isFilled = form.name
                      && form.name.value
                      && form.email
                      && form.email.value
                      && form.phone
                      && form.phone.value;
        
        const isError = isFilled && (form.name.error || form.email.error || form.phone.error);

        alert(
            isFilled && !isError ? "Add contact successfully!!!" : "Please fill out all the fields!!!"
        );
    }

    return (
        <div>
            <h1>Contact form</h1>
            <form>
                <div className={`custom-input ${form.name && form.name.error && "custom-input-error"}`}>
                    <label>Name</label>
                    <input name='name' value={form.name && form.name.value} onChange={handleChange} />
                    {form.name && form.name.error && (
                        <p className="error">{form.name.error}</p>
                    )}
                </div>
                <div className={`custom-input ${form.email && form.email.error && "custom-input-error"}`}>
                    <label>Email</label>
                    <input type='email' name='email' value={form.email && form.email.value} onChange={handleChange} />
                    {form.email && form.email.error && (
                        <p className="error">{form.email.error}</p>
                    )}
                </div>
                <div className={`custom-input ${form.phone && form.phone.error && "custom-input-error"}`}>
                    <label>Phone</label>
                    <input type='number' name='phone' value={form.phone && form.phone.value} onChange={handleChange} />
                    {form.phone && form.phone.error && (
                        <p className="error">{form.phone.error}</p>
                    )}
                </div>
                <div className='custom-input'>
                    <label>Message</label>
                    <textarea name='message' value={form.message && form.message.value} onChange={handleChange} />
                </div>
                <button type='button' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}