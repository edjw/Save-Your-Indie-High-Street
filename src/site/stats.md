---
title: Stats
layout: layouts/page.njk
---
Some stats about the site

<br>

### Number of places on the site – {{ places | length }}

<br>

### Number of businesses on the site – {{ businesses | length }}

<br>

### Number of businesses per place

{% for town_city, businesses in businesses | groupby("town_city") | dictsort %}

{{ town_city }} – {{ businesses | length }}

{% endfor %}