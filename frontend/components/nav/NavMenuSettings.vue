<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="mb-2 title">{{ $t('settings.title') }}</div>
      </v-col>
    </v-row>
    <v-row align="center" dense>
      <v-col>{{ $t('settings.language') }}</v-col>
      <v-col>
        <chooser-language />
      </v-col>
    </v-row>
    <v-row align="center" dense>
      <v-col>{{ $t('settings.darkmode') }}</v-col>
      <v-col>
        <chooser-theme />
      </v-col>
    </v-row>
  </v-container>
</template>
