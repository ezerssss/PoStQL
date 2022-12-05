export function dateFormatter(postDate: Date): string {
    const date = new Date(postDate);
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    const displayMonth = `${mm < 10 ? '0' + mm : mm}`;
    const displayDay = `${dd < 10 ? '0' + dd : dd}`;

    return `${displayMonth}/${displayDay}/${yyyy}`;
}
