var recognition;
        if (!("webkitSpeechRecognition" in window)) {
            document.getElementById("status").innerText = "Web Speech API not supported";
            console.error("[ERROR] Web Speech API not supported in this browser.");
        } else {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US";

            recognition.onresult = function (event) {
                let final_transcript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        final_transcript += event.results[i][0].transcript + " ";
                    }
                }
                document.getElementById("transcript").value = final_transcript;
                console.log("[INFO] Transcribed Text:", final_transcript);
            };
        }

        function startDictation() {
            recognition.start();
            document.getElementById("status").innerText = "Recording...";
            console.log("[INFO] Voice recording started.");
        }

        function stopDictation() {
            recognition.stop();
            document.getElementById("status").innerText = "Stopped";
            console.log("[INFO] Voice recording stopped.");
        }

        function extractActions() {
            const text = document.getElementById("transcript").value.trim();
            if (!text) {
                console.error("[ERROR] No text available for extraction.");
                alert("Please record or enter some text first.");
                return;
            }

            console.log("[INFO] Sending text for extraction:", text);
            fetch("http://127.0.0.1:5000/extract", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: text })
            })
                .then(response => {
                    console.log("[INFO] Response received:", response);
                    return response.json();
                })
                .then(data => {
                    console.log("[SUCCESS] Extracted Data:", data);
                    let html = "<h3>Extracted Actions:</h3><ul>";

                    if (data.actions.length > 0) {
                        data.actions.forEach(action => {
                            html += "<li>" + action + "</li>";
                        });
                    } else {
                        html += "<li>No actions found.</li>";
                    }

                    html += "</ul><h3>Extracted Dates:</h3><ul>";
                    data.dates.forEach(date => {
                        html += "<li>" + date + "</li>";
                    });
                    html += "</ul><h3>Key Discussion Points:</h3><ul>";
                    data.key_points.forEach(point => {
                        html += "<li>" + point + "</li>";
                    });
                    html += "</ul>";

                    document.getElementById("results").innerHTML = html;
                })
                .catch(error => {
                    console.error("[ERROR] API Call Failed:", error);
                    document.getElementById("results").innerHTML = "<p style='color: red;'>Error extracting data.</p>";
                });
        }
    //     function extractActions() {
    //     const text = document.getElementById("transcript").value.trim();
    //     if (!text) {
    //         console.error("[ERROR] No text available for extraction.");
    //         alert("Please record or enter some text first.");
    //         return;
    //     }

    //     console.log("[INFO] Sending text for extraction:", text);
    //     fetch("http://127.0.0.1:5000/extract", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ text: text })
    //     })
    //         .then(response => {
    //             console.log("[INFO] Response received:", response);
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log("[SUCCESS] Extracted Data:", data);
                
    //             if (!data.tasks || data.tasks.length === 0) {
    //                 document.getElementById("results").innerHTML = "<p>No tasks found.</p>";
    //                 return;
    //             }

    //             let html = "<h3>Extracted Tasks:</h3><ul>";

    //             data.tasks.forEach(task => {
    //                 html += "<li><strong>Action:</strong> " + task.action + "<br>";
    //                 html += "<strong>Date:</strong> " + (task.date !== "N/A" ? task.date : "Not specified") + "<br>";
    //                 html += "<strong>Key Point:</strong> " + (task.key_point !== "N/A" ? task.key_point : "Not specified") + "</li><br>";
    //             });

    //             html += "</ul>";
    //             document.getElementById("results").innerHTML = html;
    //         })
    //         .catch(error => {
    //             console.error("[ERROR] API Call Failed:", error);
    //             document.getElementById("results").innerHTML = "<p style='color: red;'>Error extracting data.</p>";
    //         });
    // }
