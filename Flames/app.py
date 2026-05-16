from collections import Counter


def remove_common_letters(name1, name2):
    # Convert to lowercase and remove spaces
    name1 = name1.replace(" ", "").lower()
    name2 = name2.replace(" ", "").lower()

    counter1 = Counter(name1)
    counter2 = Counter(name2)

    # Remove common letters
    common = counter1 & counter2

    # Remaining counts
    remaining1 = counter1 - common
    remaining2 = counter2 - common

    # Total remaining letters count
    count = sum(remaining1.values()) + sum(remaining2.values())

    return count


def flames_result(count):
    flames = list("FLAMES")
    index = 0

    while len(flames) > 1:
        index = (index + count - 1) % len(flames)
        flames.pop(index)

    return flames[0]


def flames_meaning(letter):
    meanings = {
        "F": "Friends",
        "L": "Love",
        "A": "Affection",
        "M": "Marriage",
        "E": "Enemy",
        "S": "Siblings"
    }

    return meanings[letter]


# Input
yourName = input("Your Name: ")
partnerName = input("Partner Name: ")

# Remaining letter count
countedNumbers = remove_common_letters(yourName, partnerName)

print(f"\nFinal Count: {countedNumbers}")

# FLAMES result
final_letter = flames_result(countedNumbers)

print(f"Final Letter: {final_letter}")
print(f"Relationship: {flames_meaning(final_letter)}")