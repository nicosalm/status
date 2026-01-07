<script lang="ts">
    import type { PageProps } from './$types';
    import type { Language, ActivityItem } from '$lib/api';

    let { data }: PageProps = $props();

    let { checks, editors } = $derived(data);
    let languages = $derived(
        data.languages.filter((l: Language) => l.name != 'Other' && l.decimal >= 0.5)
    );
    let activity = $derived.by(() => {
        const seconds = data.activity.reduce(
            (acc: number, cur: ActivityItem) => acc + cur.grand_total.total_seconds,
            0
        );
        const hours = (seconds / 3600).toFixed(2);
        return { hours };
    });

    const colors = {
        UP: '#23C552',
        DOWN: '#F84F31'
    };
</script>

<p><a href="https://salm.dev/">home</a> / status</p>
<h1>Status</h1>
<h2>services</h2>
{#each checks as check}
    <div>
        <h4><a href={check.url} target="_blank">{check.alias || check.url}</a></h4>
        <p>
            <span style="font-weight: bold; color: {!check.down ? colors.UP : colors.DOWN}"
                >{!check.down ? 'UP' : 'DOWN'}</span
            >
            :: {check.uptime.toFixed(2)}%
            <span style="color: var(--text-secondary)"
                >({check.domain.remaining_days + 'd left'})</span
            >
        </p>
        <p>checked: {check.last_check_at}</p>
    </div>
{/each}

<hr />
<h2>in the last 7 days</h2>
<div style="display: flex; flex-wrap: wrap; justify-content: space-between">
    <div>
        <h4 style="text-decoration: underline">languages</h4>
        {#each languages as language}
            <p style="color: {language.color}">
                {language.name}: <span style="font-family: firacode">{language.decimal}h</span>
            </p>
        {/each}
    </div>

    <div>
        <h4 style="text-decoration: underline">editors</h4>
        {#each editors as editor}
            <p style="color: {editor.color}">{editor.name}: {editor.percent}%</p>
        {/each}
    </div>

    <div>
        <h4 style="text-decoration: underline">coding activity</h4>
        {#if activity}
            <p>total: <span style="font-family: firacode">{activity.hours}h</span></p>
        {/if}
    </div>
</div>

<footer>
    <p>
        © {new Date().getFullYear()} salm.dev | nico@<span style="display:none"
            >I hope this works :)</span
        >salm.<span style="display:none">A second one for good measure</span>dev
    </p>
</footer>
