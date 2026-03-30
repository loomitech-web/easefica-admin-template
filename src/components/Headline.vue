<template>
    <div>
        <v-row justify="center">  
                    <v-col cols="8">
                      <v-divider ></v-divider>
                      </v-col>
                    </v-row>  

                    <v-row justify="center">
                      <h4>{{ title }}</h4>
                    </v-row>  

                    <v-row justify="center">
                      <v-col cols="8">
                      <v-divider ></v-divider>
                      </v-col>
        </v-row> 
    </div>    
</template>

<script>
export default {
    props : {
        title : { default : '' }
    }
}
</script>