from uszipcode import SearchEngine
from math import radians, sin, cos, sqrt, atan2

# Tanvi Deshpande - Registration
def validate_zip(zipcode):
    # Create a SearchEngine instance
    search = SearchEngine()

    # Search for the zipcode
    result = search.by_zipcode(zipcode)

    # Return True if the result is not None (i.e., the zipcode is valid)
    return result is not None




# Anish Garikipati - Calculate distance between two zip codes
def haversine_distance(lat1, lon1, lat2, lon2):
    # Convert latitude and longitude from degrees to radians
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    # Haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    radius_of_earth_km = 6371.0
    distance_km = radius_of_earth_km * c
    
    # Convert distance from kilometers to miles
    distance_miles = distance_km * 0.621371

    # Round the distance to 1 decimal place
    distance_miles = round(distance_miles, 1)

    # Update the return value
    return distance_miles




# Anish Garikipati - Calculate distance between two zip codes
def get_distance(zipcode1, zipcode2):
    # Create a search engine instance
    search = SearchEngine()

    # Get the location information for the first zipcode
    location1 = search.by_zipcode(zipcode1)

    # Get the location information for the second zipcode
    location2 = search.by_zipcode(zipcode2)

    # Calculate the haversine distance between the two locations
    distance = haversine_distance(location1.lat, location1.lng, location2.lat, location2.lng)

    # Return the distance
    return distance
