export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        // Endpoint_url+?+token
        const token = context.rootGetters.token
        const res = await fetch(`https://vue-coach-proj-bb3c8-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` + token, {
            method: 'PUT', //因为注册的时候会有一个id，就用这个id当作
            body: JSON.stringify(coachData)
        });

        // const resData = await res.json();

        if (!res.ok) {
            // error ..

        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context) {
        const response = await fetch(`https://vue-coach-proj-bb3c8-default-rtdb.firebaseio.com/coaches.json`);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const coaches = [];
        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            };
            coaches.push(coach);
        }
        context.commit('setCoaches', coaches);
    }
};