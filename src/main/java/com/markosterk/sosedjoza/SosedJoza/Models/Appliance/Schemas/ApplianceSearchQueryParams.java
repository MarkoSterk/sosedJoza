package com.markosterk.sosedjoza.SosedJoza.Models.Appliance.Schemas;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.Map;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApplianceSearchQueryParams {
    private String[] department = new String[]{"kuhinja", "delavnica", "vrt", "multimedia", "prosti čas", "ostalo"};
    private String name;
    private Integer page = 0;
    private Integer perPage = 10;
    private String orderBy = "-createdAt";

    public ApplianceSearchQueryParams(Map<String,String> queryParams){
        this.setName(queryParams.get("name"));
    }

    public Sort getSorting(){
        return Sort.by(Sort.Order.desc(this.getOrderBy().substring(1)));
    }

    public PageRequest getPagination(){
        return PageRequest.of(this.getPage(), this.getPerPage(), this.getSorting());
    }

}
