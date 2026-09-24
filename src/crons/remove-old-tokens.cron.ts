import { CronJob } from "cron";

import { configs } from "../configs/configs";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepository } from "../repositories/token.repository";

const handler = async () => {
    try {
        const { value, unit } = timeHelper.parseConfigString(
            configs.JWT_REFRESH_EXPIRATION,
        );
        const date = timeHelper.subtractByParams(value, unit);
        const deletedCount = await tokenRepository.deleteBeforeDate(date);
        console.log(`Deleting ${deletedCount} old tokens`);
    } catch (e) {
        console.log(e);
    }
};

export const removeOldTokensCronJob = new CronJob("0 0 * * *", handler);
