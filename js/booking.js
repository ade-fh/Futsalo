Vue.component('booking',
    {
        props: ["id"],
        template: `<div :class="'animated fadeInRight component booking ' + id">
                    <h1 v-if="afterSubmit" class="animated bounceIn">We Have Received Your Request Succesfully !</h1>       
                    <span class="notifications first-noti animated shake">Isilah data dengan benar dan lengkap</span>
                    <span class="notifications second-noti animated shake">Please, Select a Date Before Submitting Request</span>
                    <span class="notifications third-noti animated shake">Please, Select Time Before Submitting Request</span>
                    <span class="notifications last-noti animated shake">Isilah data dengan benar dan lengkap</span>

                    <div v-if="!afterSubmit">
                        <form v-on:submit.prevent>
                            <div class="input-field col s6">
                                <input id="last_name" type="text" class="validate" v-model="customerName">
                                <label for="last_name" class="customerinfo">Your Name</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="phone" type="text" class="validate" v-model="customerNumber">
                                <label for="phone" class="customerinfo">Your Contact Number</label>
                            </div>

                            <input type="text" class="datepicker" placeholder="Pick a date">
                        
                            <div class="select-time" @click="checkDate">See Available Times</div>
                            <select class="browser-default time" v-show="dataSelected == 'selected'">
                                <option value="">Select Time</option>
                                <option v-check v-for="time in allTime" :value="time">{{ time }}</option>
                            </select>
                            <hr>

                            <button @click="post" class="submit-button btn waves-effect waves-light" type="submit" name="action">
                            <i class="material-icons right">send</i>
                            Submit
                            </button>
                        </form>
                    </div>
                </div>`,

        data() {
            return {
                afterSubmit: false,
                customerName: "",
                customerNumber: "",
                dataSelected: 'notselected',
                date: '',
                bookedTime: [],
                allTime: [9, 10, 11, 12, 13, 14, 15, 16, 17],
                validationName: false,
                validationDate: false,
                validationTime: false,
                validationNumber: false

            }
        },

        methods:
        {
            checkDate() {
                this.date = document.getElementsByClassName('datepicker')[0].value;
                if (this.date) {
                    this.dataSelected = 'selected';
                    // Fetching all existing booking
                    this.$http.get('https://reservation-system-b68bc.firebaseio.com/appointments.json').then(function (data) {
                        let savedData = Object.values(data.body);
                        for (let x = 0; x < savedData.length; x++) {
                            // If the date is same in existing bookings, then store all booked hours for that date in bookedTime array
                            if (savedData[x].date == this.date) {
                                this.bookedTime.push(parseInt(savedData[x].time));
                            }
                            console.log(this.bookedTime);
                        }
                    });
                }
            },

            post() {
                let time = document.getElementsByClassName('time')[0].value;
                this.checkDate();

                (!this.customerName) ? alert('Anda belum memasukkan nama!') : this.validationName = true;
                (!this.customerNumber) ? alert('Anda belum memasukkan nomor!') : this.validationNumber = true;
                (!this.date) ? alert('Anda belum memasukkan hari booking!') : this.validationDate = true;
                (!time) ? alert('Anda belum memasukkan waktu booking!') : this.validationTime = true;


                if (this.validationDate == true && this.validationName == true && this.validationNumber == true && this.validationTime == true) {
                    this.$http.post('https://reservation-system-b68bc.firebaseio.com/appointments.json',
                        {
                            "customerName": this.customerName,
                            "customerNumber": this.customerNumber,
                            "date": this.date,
                            "time": time,
                            "status": "pending"
                        }).then(function (data) {
                            this.afterSubmit = true;
                        })
                }
            },

            notification(element) {
                document.getElementsByClassName(element)[0].style.display = "block";

                setTimeout(function () {
                    document.getElementsByClassName(element)[0].style.display = "none";
                }, 5000)

            },


        }
    });

// Filter waktu
Vue.directive('check',
    {
        update(el, binding, vnode) {
            let time = parseInt(el.innerHTML);
            let check = vnode.context.bookedTime.includes(time); // Will return boolean if hours are same
            if (check) {
                el.disabled = true;
                el.style.color = "red";
            }
            else {
                el.disabled = false;
                el.style.color = "green";
                el.style.fontSize = "1.2rem";
            }
        }
    });

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    // Limit the past day
    var instances = M.Datepicker.init(elems, { minDate: new Date() });
});