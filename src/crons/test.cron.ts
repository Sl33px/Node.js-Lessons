import { CronJob } from "cron";

class TestCron {
    public static async run() {
        console.log("TestCron is running");
    }
}
export const testCronJob = new CronJob("5 */2 10-20 6-8 *", TestCron.run);
