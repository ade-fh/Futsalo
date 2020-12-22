Vue.component('contact',
    {
        props: ["id"],
        template: `<div :class="'animated fadeInRight component contact ' + id">
                    <span>082236728283</span><hr class="hrhr">

                    <i class="material-icons-two-tone">alternate_email</i>
                    <span>ade.f@mail.ugm.ac.id</span><hr class="hrhr">

                    <i class="material-icons-two-tone">location_city</i>
                    <span>Purwomartani, Kalasan</span><hr class="hrhr">
                </div>`
    });