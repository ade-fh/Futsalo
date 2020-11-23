Vue.component('admin',
    {
        template: `<div class="container">
                        <table class="pending">
                            <thead>
                                <tr>
                                    <th>Dates</th>
                                    <th>Timing</th>
                                    <th>Names</th>
                                    <th>Contact</th>
                                    <th>Status</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="booking in bookings" v-show="booking.status == 'pending'">
                                    <td>{{ booking.date }}</td>
                                    <td>{{ booking.time }}</td>
                                    <td>{{ booking.customerName }}</td>
                                    <td>{{ booking.customerNumber }}</td>
                                    <td>{{ booking.status }}</td>
                                    <td>
                                        <a href="javascript:;">
                                            <i @click="update" :data-key=booking.unique :id=booking.status class="material-icons">autorenew</i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <br>
                        <br>

                        <table class="approved">
                            <thead>
                                <tr>
                                    <th>Dates</th>
                                    <th>Timing</th>
                                    <th>Names</th>
                                    <th>Contact</th>
                                    <th>Status</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="booking in bookings" v-show="booking.status == 'approved'">
                                    <td>{{ booking.date }}</td>
                                    <td>{{ booking.time }}</td>
                                    <td>{{ booking.customerName }}</td>
                                    <td>{{ booking.customerNumber }}</td>
                                    <td>{{ booking.status }}</td>
                                    <td>
                                        <a href="javascript:;">
                                            <i @click="update" :data-key=booking.unique :id=booking.status class="material-icons">autorenew</i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>`,
        data() {
            return {
                bookings: [],
                statusUpdate: ""
            }
        },

        methods:
        {
            update(event) {
                let key = event.srcElement.dataset.key;
                let status = event.srcElement.id;
                // If clicked, update status
                (status == 'pending') ? this.statusUpdate = 'approved' : this.statusUpdate = 'pending';

                let reload = () => { this.fetcher(); }
                firebase.database().ref('appointments').child(key).update(
                    {
                        status: this.statusUpdate
                    }, function (error) {
                        if (!error) {
                            reload();
                        }
                    }
                );

            },

            fetcher() {
                //Fetching data from firebase
                this.$http.get('https://reservation-system-b68bc.firebaseio.com/appointments.json').then(function (data) {
                    return data.json();
                }).then(function (data) {
                    let requests = [];
                    for (let key in data) {
                        data[key].unique = key; // Menambah property (unique) di setiap object dan mengassign value dari object, key
                        requests.push(data[key]);
                    }
                    this.bookings = requests;
                });
            }
        },

        created() {
            this.fetcher();
        }

    });