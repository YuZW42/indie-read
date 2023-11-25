import pandas as pd

try:
    with open("cfba.json", "r") as file:
        json_data = pd.read_json(file)

    json_data.to_csv("cfba.csv", index=False)

    print("Successfully created CSV file")
except:
    print("Failed to create CSV file")