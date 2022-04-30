<template>
  <div>
    <section>
      <base-card>
        <h2>Register as a coach now??</h2>
        <coach-form @save-data="saveData"></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
import BaseCard from '../../components/ui/BaseCard.vue';

export default {
  components: {
    CoachForm,
    BaseCard,
  },

  methods: {
    saveData(formData) {
      // 将数据新增到store，用dispatch()方法。因为namespaced，
      // 所以路径是 ('coaches/registerCoach')
      this.$store.dispatch('coaches/registerCoach', formData);
      this.$router.replace('/coaches');
    },
  },
};
</script>