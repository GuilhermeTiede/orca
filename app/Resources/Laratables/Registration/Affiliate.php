<?php

namespace App\Resources\Laratables\Registration;

use App\Resources\Laratables\Base;

class Affiliate extends Base
{
    public static function laratablesQueryConditions($query)
    {
        $query = static::applyColumnFilters($query);

        return $query;
    }

}
