/**
 * This code is centrally managed in https://github.com/asyncapi/.github/
 * Don't make changes to this file in this repo as they will be overwritten with changes made to the same file in above mentioned repo.
 */

const mailchimp = require('@mailchimp/mailchimp_marketing');
const core = require('@actions/core');
const htmlContent = require('./htmlContent.js');

/**
 * Sending API request to Mailchimp to schedule email to subscribers.
 * Input: URL to issue/discussion or other resource.
 */
module.exports = async (link, title) => {
    try {
        // Validate required environment variables
        const apiKey = process.env.MAILCHIMP_API_KEY;
        const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
        const listId = process.env.MAILCHIMP_LIST_ID;
        const interestGroupId = process.env.MAILCHIMP_INTEREST_GROUP_ID;
        const interestValue = process.env.MAILCHIMP_INTEREST_VALUE;

        if (!apiKey || !serverPrefix || !listId || !interestGroupId || !interestValue) {
            throw new Error("Missing required environment variables. Check Mailchimp API configurations.");
        }

        // Configure Mailchimp API
        mailchimp.setConfig({
            apiKey: apiKey,
            server: serverPrefix
        });

        /*
         * Step 1: Create the Campaign
         */
        const newCampaign = await mailchimp.campaigns.create({
            type: 'regular',
            recipients: {
                list_id: listId,
                segment_opts: {
                    match: 'any',
                    conditions: [{
                        condition_type: 'Interests',
                        field: `interests-${interestGroupId}`,
                        op: 'interestcontains',
                        value: [interestValue]
                    }]
                }
            },
            settings: {
                subject_line: `TSC attention required: ${title}`,
                preview_text: 'Check out the latest topic that TSC members have to be aware of',
                title: `New topic info - ${new Date().toUTCString()}`,
                from_name: 'AsyncAPI Initiative',
                reply_to: 'info@asyncapi.io',
            }
        });

        core.info(`Campaign created successfully: ${newCampaign.id}`);

        /*
         * Step 2: Set the Email Content
         */
        await mailchimp.campaigns.setContent(newCampaign.id, { html: htmlContent(link, title) });
        core.info(`Email content added successfully.`);

        /*
         * Step 3: Schedule the Email
         */
        const now = new Date();
        const nextHour = new Date(now.setUTCHours(now.getUTCHours() + 1, 0, 0, 0));

        await mailchimp.campaigns.schedule(newCampaign.id, {
            schedule_time: nextHour.toISOString(),
        });

        core.info(`Email campaign scheduled for: ${nextHour.toUTCString()}`);

    } catch (error) {
        core.setFailed(`Error in Mailchimp email scheduling: ${error.message}`);
    }
};
