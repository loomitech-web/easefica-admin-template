<template>
    <div style="padding: 64px; max-height: 80%; overflow-y: scroll">
        <v-card elevation="5">
            <v-card-title>AI DETAILS</v-card-title>
            <v-card-text>
                <v-form>
                    <v-row class="section-row">
                        <v-col cols="12" :xl="6" :lg="6" :md="6" :sm="12" :xs="12">
                            <v-text-field v-model="ai.regName" label="Institution Name" required clearable dense />
                        </v-col>

                        <v-col cols="12" :xl="6" :lg="6" :md="6" :sm="12" :xs="12">
                            <v-select v-model="ai.institution" :items="institutionTypes" label="Institution Type"
                                data-vv-name="select" required outlined clearable />
                        </v-col>

                        <v-col cols="12" :xl="6" :lg="6" :md="6" :sm="12" :xs="12">
                            <v-text-field v-model="ai.id_reg_number" label="ID/Registration Number" required clearable
                                dense />
                        </v-col>



                        <v-col cols="12" :xl="6" :lg="6" :md="6" :sm="12" :xs="12">
                            <v-text-field v-model="ai.taxNumber" label="Tax/Ref Number" required clearable
                                dense></v-text-field></v-col>

                        <v-col cols="12" :xl="6" :lg="6" :md="6" :sm="12" :xs="12">
                            <document-uploader helpText="Upload Registration Documents" />
                        </v-col>

                        <v-col cols="12" :xl="6" :lg="6" :md="6" :sm="12" :xs="12">
                            <document-uploader helpText="Upload SLA Document" />
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>

        <v-card style="margin-top: 64px" elevation="5">
            <v-card-title>AI ADDRESS</v-card-title>
            <v-card-text>
                <v-form>
                    <v-row class="section-row">
                        <v-col>
                            <v-text-field v-model="ai.unitNo" label="Unit No." required clearable></v-text-field>

                            <v-text-field v-model="ai.streetNo" label="Street Number" required clearable></v-text-field>

                            <v-text-field v-model="ai.suburb" label="Suburb" required clearable></v-text-field>

                            <v-text-field v-model="ai.province" label="Province" required clearable></v-text-field>

                            <v-text-field v-model="ai.postalCode" label="Postal Code" required clearable></v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field v-model="ai.complex" label="Complex Name" required clearable></v-text-field>

                            <v-text-field v-model="ai.street" label="Street Address" required clearable></v-text-field>

                            <v-text-field v-model="ai.city" label="City" required clearable></v-text-field>

                            <v-text-field v-model="ai.country" label="Country" required clearable></v-text-field>

                            <document-uploader helpText="Upload Proof Of Address" />
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>

        <v-card style="margin-top: 64px" elevation="5">
            <v-card-title>AI ACCOUNT CONTACT</v-card-title>
            <v-card-text>
                <v-form>
                    <v-row class="section-row">
                        <v-col cols="6">
                            <v-text-field v-model="ai.accountingContact.firstName" label="First Name" required
                                clearable></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field v-model="ai.accountingContact.firstName" label="First Name" required
                                clearable></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field v-model="ai.accountingContact.surname" label="Surname" required
                                clearable></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field v-model="ai.accountingContact.email" label="Email" required
                                clearable></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field v-model="ai.accountingContact.tel" label="Tel" required clearable></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field v-model="ai.accountingContact.designation" label="Designation" required
                                clearable></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field v-model="ai.accountingContact.accountNo" label="Account Number" required
                                clearable></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <document-uploader helpText="Upload Identity Document" />
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import DocumentUploader from "./DocumentUploader.vue";
import store from "../store";

export default {
    components: {
        DocumentUploader
    },
    props: {

    },
    computed: {
        institutionTypes() {
            return store.getters.institutionTypes;
        },
        ai() {
            return store.getters.ai;
        },
    },
    async created() {
        await store.dispatch("getInstitutionTypes", { id: store.getters.user.aiId });
    },
}
</script>