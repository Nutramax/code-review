import React, {Fragment } from "react";
import { render } from "react-dom";
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      success: false,
      MCSub: false,
      first_name: '',
      last_name: '',
      email: '',
      mcUpdate: '',
      emailval: false,
      address: '',
      goDB: true,
      address2: '',
      city: '',
      state: '',
      zip: '',
      occupation: '',
      goodTogo: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   handleSwitch = (e) => {
    this.setState({ MCSub: !this.state.MCSub });
 }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const { first_name, last_name, address, email, city, state, zip, occupation } = this.state;
  
    if(name === "email"){
      let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!regEmail.test(value)){
        this.setState({
          email: value,
          emailval: true
        });
      } else {
        this.setState({
          email: value,
          emailval: false
        });
      }
    } else {
      this.setState({
        [name]: value.replace(/[^\w\s]/gi, "")
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { first_name, last_name, address, address2, email, city, state, zip, MCSub, goDB, occupation} = this.state;
    if(first_name !== "" && last_name !== "" && address !== "" && email !== "" && city !== "" && state !== "" && zip !== "" && occupation !== "" ){
      axios({
        method: 'get',
        url: `https://2001.app.nutramax.com/?email=${email}&first_name=${first_name}&last_name=${last_name}&address=${address}&address2=${address2}&city=${city}&state=${state}&zip=${zip}&occupation=${occupation}&sub=${MCSub}&db=${goDB}`,
        headers: { "Content-Type": "multipart/form-data" }
      }) 
      .then((result) => {
        if(result.data.status === "fail" || result.data.status === "skipped"){
          this.setState({ 
            success: false,
            error: true  
          });
          console.log([result.data])
        } else {
          this.setState({ 
            success: true,
            error: false  
          });
          console.log([result.data])
        }
        if(result.data.mailchimp === "updated"){
          this.setState({ 
            mcUpdate: true, 
          });
        } 
      });
    } else {
      this.setState({ 
        goodTogo: false, 
      });
    }
  }

  render() {
    return (
      <Fragment>
        <section className={`Ty ${this.state.success || this.state.error || this.state.mcUpdate ? 'hidden' : ''}`}>
          <div id="cvmForm">
            <form id="wf-form-Email-Form" name="wf-form-Email-Form" data-name="Email Form" onSubmit={this.handleSubmit} target="my_iframe">
              <div className="two-field-wrapper">
                <div className="first-name">
                  <label htmlFor="first_name" className="form-label">FIRST NAME*</label>
                  <input type="text" className="w-input" maxLength="256" name="first_name" data-name="First Name" placeholder="" id="first_name" onChange={this.handleInputChange}/>
                  <span className={`error ${this.state.first_name.length >= 3 || this.state.first_name === "" ? 'hidden' : ''}${!this.state.goodTogo && this.state.first_name === "" ? 'checkIT' : ''}`}>A first name is required.</span>
                </div>
                <div className="last-name">
                  <label htmlFor="last_name" className="form-label">LAST NAME*</label>
                  <input type="text" className="w-input" maxLength="256" name="last_name" data-name="Last Name" placeholder="" id="last_name" onChange={this.handleInputChange}/>
                  <span className={`error ${this.state.last_name.length >= 3 || this.state.last_name === "" ? 'hidden' : ''}${!this.state.goodTogo && this.state.last_name === "" ? 'checkIT' : ''}`}>A last name is required.</span>
                </div>
              </div>
              <label htmlFor="email" className="form-label">EMAIL*</label>
              <input type="text" className="w-input" maxLength="256" name="email" data-name="Email" id="email" required="" onChange={this.handleInputChange}/>
              <span className={`error ${this.state.emailval ? '' : 'hidden'}`}>A valid email is required.</span>
              <label htmlFor="address" className="form-label">Street Address *</label>
              <input type="text" className="w-input" maxLength="256" name="address" data-name="Address" id="address" required="" onChange={this.handleInputChange}/>
              <span className={`error ${this.state.address.length >= 3 || this.state.address === "" ? 'hidden' : ''}${!this.state.goodTogo && this.state.address === "" ? 'checkIT' : ''}`}>A valid adress is required.</span>
              <div className="three-field-wrapper">
                <div className="wrap short-field">
                  <label htmlFor="address2" className="form-label">APT, SUITE...</label>
                  <input type="text" className="w-input" maxLength="256" name="address2" data-name="Address 2" placeholder="" id="address2" required="" onChange={this.handleInputChange}/>
                </div>
                <div className="wrap short-field">
                  <label htmlFor="city" className="form-label">City*</label>
                  <input type="text" className="w-input" maxLength="256" name="city" data-name="City" placeholder="" id="city" required="" onChange={this.handleInputChange}/>
                  <span className={`error ${this.state.city.length >= 3 || this.state.city === "" ? 'hidden' : ''} ${!this.state.goodTogo && this.state.city === "" ? 'checkIT' : ''}`}>A valid city is required.</span>
                </div>
                <div className="wrap short-field">
                  <label htmlFor="state" className="form-label">State*</label>
                  <input type="text" className="w-input" maxLength="256" name="state" data-name="State" placeholder="" id="state" required="" onChange={this.handleInputChange}/>
                  <span className={`error ${this.state.state.length >= 2 || this.state.state === "" ? 'hidden' : ''} ${!this.state.goodTogo && this.state.state === "" ? 'checkIT' : ''}`}>A valid state is required.</span>
                </div>
                <div className="wrap short-field">
                  <label htmlFor="zip" className="form-label">ZIP CODE*</label>
                  <input type="text" className="w-input" maxLength="256" name="zip" data-name="Zip" placeholder="" id="zip" required="" onChange={this.handleInputChange}/>
                  <span className={`error ${this.state.zip.length >= 3 || this.state.zip === "" ? 'hidden' : ''} ${!this.state.goodTogo && this.state.zip === "" ? 'checkIT' : ''}`}>A valid zip code is required.</span>
                </div>
              </div>
              <label htmlFor="occupation" className="form-label">SELECT THE SWEEPSTAKES CATEGORY FOR ENTRY*</label>
              <select id="occupation" name="occupation" required="" className="select-field w-select" onChange={this.handleInputChange}>
                <option value="">Select an option</option>
                <option value="Veterinarian">Veterinarian</option>
                <option value="Veterinary Tech/Assistant/Student">Veterinary Tech/Assistant/Student</option>
              </select>
              <span className={`error ${this.state.occupation === "" || this.state.occupation.length >= 3 ? 'hidden' : ''} ${!this.state.goodTogo && this.state.occupation === "" ? 'checkIT' : ''}`}>A Category is required.</span>
              <label className="w-checkbox checkbox-field">
                <input type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" className="w-checkbox-input" onChange={this.handleSwitch}/><span className="checkbox-label w-form-label">Opt-in: (Optional) Yes, I wish to receive electronic promotions, special offers, and new product information from Nutramax Laboratories Veterinary Sciences, Inc. (“Nutramax”). I understand I can unsubscribe at any time. Emails and other marketing communications from Nutramax, including offers or promotions contained therein, are intended for and available to United States residents only. By clicking ‘Sign Me Up!’, I certify that I am a resident of the United States and at least 18 years of age.</span>
              </label>
              <input type="submit" value="Sign Me Up!" data-wait="Please wait..." className="submit-button w-button"/>
              <iframe title="Status" className="hidden" name="my_iframe" src="https://2001.app.nutramax.com/"></iframe>
            </form>
          </div>
        </section>
        <section className={`Ty ${this.state.success ? '' : 'hidden' || this.state.error ? 'hidden' : ''}`}>
          <div id="ty">
            <div className="ty__item item1">
              <h1 className="ty__h1">Thank you!</h1>
              <p className="ty__p">You have been registered</p>
            </div>
          </div>
        </section>
        <section className={`Ty ${this.state.error ? '' : 'hidden' } ${this.state.mcUpdate ? 'hidden' : ''}`} id="OHOW">
          <p className="OHOW__p item1">OH OW!</p>
          <p className="OHOW__p item2">Something seems to have gone askew.<br/> Try resubmitting form.</p>
        </section>
        <section className={`Ty ${this.state.goodTogo || this.state.success ? 'hidden' : ''}`} id="GTG">
          <p className="GTG__p item2">Something seems to be missing...</p>
        </section>
        <section className={`Ty ${this.state.mcUpdate ? '' : 'hidden'} ${this.state.success ? 'hidden' : ''}`} id="UPd">
          <p className="UPd__p item">We see you have already signed up. We've updated your email information.</p>
        </section>
      </Fragment>
    );
  }
}

export default App;