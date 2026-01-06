<script lang="ts">
    import type { PageProps } from "./$types";
    import type { Language, ActivityItem } from "$lib/api";

    let { data }: PageProps = $props();

    // maybe not ideal??
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
</script>

<h1><a href="https://salm.dev/">home</a> / status</h1>
<hr/>
<h2>services</h2>
{#each checks as check}
    <div class="check-summary">
        <h3><a href={check.url} target="_blank">{check.alias || check.url}</a></h3>
        <p>
            {@html `${(check.down ? 'DOWN' : 'UP')} |
                    ${(check.uptime.toFixed(2))}% |
                    ${(check.domain.remaining_days + 'd left')}`}
        </p>
        <p>checked: {check.last_check_at}</p>
    </div>
{/each}

<hr/>

<h2>in the last 7 days</h2>
<h3>languages</h3>
{#each languages as language}
    <p style="color: {language.color}">{language.name}: <span style="font-family: firacode">{language.decimal}h</span></p>
{/each}

<h3>editors</h3>
{#each editors as editor}
    <p style="color: {editor.color}">{editor.name}: {editor.percent}%</p>
{/each}

<h3>coding activity</h3>
{#if activity}
    <p>total: <span style="font-family: firacode">{activity.hours}h</span></p>
{/if}
<hr />

<footer>
    <p>© {new Date().getFullYear()} salm.dev | nico@<span style="display:none">I hope this works :)</span>salm.<span style="display:none">A second one for good measure</span>dev</p>
</footer>