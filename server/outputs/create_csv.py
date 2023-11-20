import pandas as pd

with open("cfba.json", "r") as file:
    json_data = pd.read_json(file)

json_data.to_csv("cfba.csv", index=False)
