@AGENTS.md

## SINC dashboard

The events, team page, partners and site photos come from the SINC dashboard in the sibling folder
`../DASHBOARD` (repo `sincantwerpen/sinc-dashboard`), on the branch `dashboard-integration` (code in
`src/lib/dashboard/`, more in `README.md`). The content in `src/content/` is the fallback when the dashboard
can't be reached. Keep it current too. A change to the team list here goes to the dashboard with
`npm run team:sync -- --write` in `../DASHBOARD`. Work that changes both repos goes best in a session started
in the parent folder `../` (see `../CLAUDE.md`).

Pushing `main` deploys sincantwerpen.be straight away.
