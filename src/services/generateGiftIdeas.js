export async function generateGiftIdeas(hobbies) {

    const response = await fetch(
        "https://white-meadow-42e2.marwaqadeer2.workers.dev/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hobbies,
            }),
        }
    );

    const data = await response.json();

    console.log("FULL RESPONSE:", data);

    if (!response.ok) {
        throw new Error(
            JSON.stringify(data, null, 2)
        );
    }

    if (data.error) {
        throw new Error(
            JSON.stringify(data.error, null, 2)
        );
    }

    return data.choices[0].message.content;
}