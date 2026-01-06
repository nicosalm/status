import type { PageServerLoad } from './$types';
import type { PageData } from '$lib/api';
import { env } from '$env/dynamic/private';
import { error } from "@sveltejs/kit";

const URLS = {
    checks: 'https://updown.io/api/checks',
    languages: 'https://wakatime.com/share/@nicosalm/40b9a962-5e32-4bfe-affa-faa33ba90924.json',
    editors: 'https://wakatime.com/share/@nicosalm/994e1f21-7f88-45d0-8171-35c673ad47f5.json',
    activity: 'https://wakatime.com/share/@nicosalm/268fcdb2-fe99-408a-960a-8afde44c6a94.json'
};

export const load: PageServerLoad = async (): Promise<PageData> => {

    const [checksRes, languagesRes, editorsRes, activityRes] = await Promise.all([
        fetch(URLS.checks, { headers: { 'X-API-KEY': env.UPDOWNIO_KEY, 'Accept-Encoding': 'gzip' } }),
        fetch(URLS.languages),
        fetch(URLS.editors),
        fetch(URLS.activity)
    ]);

    const checks = checksRes.ok ? await checksRes.json() : error(checksRes.status, checksRes.statusText);
    const languages = languagesRes.ok ? (await languagesRes.json()).data : [];
    const editors = editorsRes.ok ? (await editorsRes.json()).data : [];
    const activity = activityRes.ok ? (await activityRes.json()).data : [];

    return { checks, languages, editors, activity };
};