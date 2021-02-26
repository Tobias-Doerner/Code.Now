<template>
  <v-container fluid>
    <v-row justify="center">
      <v-card color="tertiary" class="mx-auto" max-width="700" min-width="200">
        <v-img max-width="700" src="/banner.webp" />
        <v-card-text class="body-1">
          {{ $t('page.index.card.text') }}
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            href="https://github.com/Tobias-Doerner/Code.Now"
            target="_blank"
            rel="noreferrer"
          >
            {{ $t('page.index.card.btn') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>
