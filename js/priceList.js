Vue.component('pricelist',
    {
        props: ["id", "prices"],
        template: `<div :class="'animated fadeInRight component pricelist ' + id">
                    <table>
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Prices</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="pr in prices">
                                <td>{{ pr.name }}</td>
                                <td>{{ pr.price }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>`
    });