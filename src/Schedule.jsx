export function Schedule({schedule}) {
    if(!schedule)
        return <h1>No schedule selected</h1>

    return (
        <>
            <h1>{schedule.title}</h1>
            <p>{schedule.id}</p>
        </>
    );
}