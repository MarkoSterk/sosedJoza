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
public class ApplianceUrlQueryParams {
    private Long userId;
    private String[] department = new String[]{"kuhinja", "delavnica", "vrt", "multimedia", "prosti čas", "ostalo"};
    private boolean[] available = new boolean[]{true, false};
    private Number rating = 0;
    private String orderBy = "-createdAt";
    private Integer page = 0;
    private Integer perPage = 10;

    public ApplianceUrlQueryParams(Map<String,String> queryParams){
        if(queryParams.get("department")!=null){
            this.setDepartment(queryParams.get("department").split(","));
        }
        if(queryParams.get("available")!=null){
            String[] parts = queryParams.get("available").split(",");
            boolean[] array = new boolean[parts.length];
            for(int i=0; i< parts.length; i++){
                array[i]=Boolean.parseBoolean(parts[i]);
            }
            this.setAvailable(array);
        }
        if(queryParams.get("rating")!=null) this.setRating(Integer.parseInt(queryParams.get("rating")));
        if(queryParams.get("orderBy")!=null) this.setOrderBy(queryParams.get("orderBy"));
        if(queryParams.get("page")!=null) this.setPage(Integer.parseInt(queryParams.get("page")));
        if(queryParams.get("perPage")!=null) this.setPerPage(Integer.parseInt(queryParams.get("perPage")));
        if(queryParams.get("userId")!=null) this.setUserId(Long.parseLong(queryParams.get("userId")));
    }

    public Sort getSorting(){
        if(this.getOrderBy().startsWith("-")) return Sort.by(Sort.Order.desc(this.getOrderBy().substring(1)));
        return Sort.by(Sort.Order.asc(this.getOrderBy()));
    }

    public PageRequest getPagination(){
        return PageRequest.of(this.getPage(), this.getPerPage(), this.getSorting());
    }

}
